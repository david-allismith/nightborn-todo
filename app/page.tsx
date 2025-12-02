'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import TodoItem from '@/components/TodoItem';
import { fetchTodos } from '@/lib/api-client';
import { QUERY_KEYS, ROUTES } from '@/lib/constants';
import { Todo } from '@/types/todo';
import PageLayout from '@/components/PageLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import EmptyState from '@/components/EmptyState';
import StatsCard from '@/components/StatsCard';
import ProgressBar from '@/components/ProgressBar';

export default function HomePage() {
  const { data: todos, isLoading, error } = useQuery<Todo[]>({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: () => fetchTodos('date', 'newest'),
  });

  const completedCount = todos?.filter((todo) => todo.completed).length || 0;
  const totalCount = todos?.length || 0;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <PageLayout maxWidth="7xl">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                My Todo List
              </h1>
              <p className="text-lg sm:text-xl text-purple-200 font-medium">
                Stay organized and get things done
              </p>
            </div>
            <Link
              href={ROUTES.CREATE_TODO}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-6 sm:px-8 py-4 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap backdrop-blur-sm border border-white/20"
            >
              <svg
                className="w-6 h-6 transition-transform group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline text-lg">Create New Todo</span>
              <span className="sm:hidden text-lg">New Todo</span>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        {!isLoading && !error && todos && todos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <StatsCard label="Total Tasks" value={totalCount} gradient="purple" />
            <StatsCard label="Completed" value={<span className="text-green-400">{completedCount}</span>} gradient="green" />
            <StatsCard label="Remaining" value={<span className="text-blue-400">{totalCount - completedCount}</span>} gradient="blue" />
          </div>
        )}

        {/* Progress Bar */}
        {!isLoading && !error && todos && todos.length > 0 && (
          <div className="mb-8 sm:mb-10">
            <ProgressBar percentage={progressPercentage} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Loading your todos..." size="md" fullPage />}

        {/* Error State */}
        {error && (
          <ErrorDisplay
            title="Error loading todos"
            message={error.message}
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && (!todos || todos.length === 0) && <EmptyState />}

        {/* Todo List */}
        {!isLoading && !error && todos && todos.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-6 sm:px-8 lg:px-10 py-6 bg-gradient-to-r from-white/10 to-white/5 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    All Todos
                  </h2>
                  <span className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full border border-white/20 backdrop-blur-sm">
                    {totalCount}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-white/10">
                {todos.map((todo, index) => (
                  <TodoItem key={todo.id} todo={todo} isLast={index === todos.length - 1} />
                ))}
              </div>
            </div>
          </div>
        )}
    </PageLayout>
  );
}
