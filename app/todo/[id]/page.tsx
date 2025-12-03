'use client';

import {use} from 'react';
import {useRouter} from 'next/navigation';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchTodo, updateTodo, deleteTodo} from '@/lib/api-client';
import {QUERY_KEYS, ROUTES} from '@/lib/constants';
import TodoForm from '@/components/TodoForm';
import PageLayout from '@/components/PageLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import BackButton from '@/components/BackButton';
import StatusBadge from '@/components/StatusBadge';
import SuccessMessage from '@/components/SuccessMessage';
import ErrorMessage from '@/components/ErrorMessage';

interface TodoDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function TodoDetailPage({params}: TodoDetailPageProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {id: todoId} = use(params);

    const {
        data: todo,
        isLoading,
        error,
    } = useQuery({
        queryKey: QUERY_KEYS.TODO(todoId),
        queryFn: () => fetchTodo(todoId),
    });

    const updateMutation = useMutation({
        mutationFn: (updateData: Parameters<typeof updateTodo>[1]) => updateTodo(todoId, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: QUERY_KEYS.TODO(todoId)});
            queryClient.invalidateQueries({queryKey: QUERY_KEYS.TODOS});
        },
        onError: (error: Error) => {
            console.error('Failed to update todo:', error);
            alert(`Failed to update todo: ${error.message}`);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteTodo(todoId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: QUERY_KEYS.TODOS});
            router.push(ROUTES.HOME);
        },
        onError: (error: Error) => {
            console.error('Failed to delete todo:', error);
            alert(`Failed to delete todo: ${error.message}`);
        },
    });

    const handleDeleteClick = () => {
        if (todo && window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
            deleteMutation.mutate();
        }
    };

    if (isLoading) {
        return (
            <PageLayout maxWidth="3xl">
                <LoadingSpinner message="Loading todo..." size="md" fullPage/>
            </PageLayout>
        );
    }

    if (error || !todo) {
        return (
            <PageLayout maxWidth="3xl">
                <ErrorDisplay
                    title="Error"
                    message={error instanceof Error ? error.message : 'Todo not found'}
                    showBackButton
                />
            </PageLayout>
        );
    }

    const createdDate = new Date(todo.createdAt);
    const formattedDate = createdDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const formattedTime = createdDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <PageLayout maxWidth="3xl">
            {/* Header */}
            <div className="mb-8 sm:mb-10">
                <BackButton/>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                    Todo Details
                </h1>
            </div>

            {/* Status Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 mb-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span
                            className="text-sm sm:text-base font-semibold text-purple-200 uppercase tracking-wide">Status</span>
                        <StatusBadge completed={todo.completed}/>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                        <span
                            className="text-sm sm:text-base font-semibold text-purple-200 uppercase tracking-wide block mb-2">Created</span>
                        <div className="flex items-center gap-2 text-white">
                            <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <span className="text-base sm:text-lg font-medium">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-200 mt-1 ml-7">
                            <span className="text-sm sm:text-base">{formattedTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form Card */}
            <div
                className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 lg:p-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                    Edit Todo
                </h2>

                {/* Success Message */}
                {updateMutation.isSuccess && (
                    <div className="mb-6">
                        <SuccessMessage message="Todo updated successfully!"/>
                    </div>
                )}

                {/* Error Message */}
                {updateMutation.isError && (
                    <div className="mb-6">
                        <ErrorMessage message={updateMutation.error.message}/>
                    </div>
                )}

                <TodoForm
                    initial={{
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                    }}
                    onSubmit={(data) => updateMutation.mutate(data)}
                    isLoading={updateMutation.isPending}
                />

                {/* Delete Button */}
                <div className="mt-8 pt-8 border-t border-white/10">
                    <button
                        onClick={handleDeleteClick}
                        disabled={deleteMutation.isPending}
                        className="group w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
                    >
                        {deleteMutation.isPending ? (
                            <span className="flex items-center justify-center gap-3">
                  <svg
                      className="animate-spin h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Deleting...</span>
                </span>
                        ) : (
                            <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Delete Todo
                </span>
                        )}
                    </button>
                </div>
            </div>
        </PageLayout>
    );
}

