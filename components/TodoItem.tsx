'use client';

import Link from 'next/link';
import { Todo } from '@/types/todo';
import { ROUTES } from '@/lib/constants';
import StatusBadge from './StatusBadge';

type Props = {
  todo: Todo;
  isLast?: boolean;
};

export default function TodoItem({ todo, isLast = false }: Props) {
  const createdDate = new Date(todo.createdAt);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: createdDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
  const formattedTime = createdDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Link
      href={ROUTES.TODO_DETAIL(todo.id)}
      className={`block px-6 sm:px-8 lg:px-10 py-6 sm:py-7 hover:bg-white/10 active:bg-white/5 transition-all duration-300 group relative ${
        !isLast ? 'border-b border-white/10' : ''
      }`}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative flex items-start justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-4 mb-3">
            {/* Status indicator */}
            <div className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              todo.completed
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50'
                : 'bg-white/10 border-2 border-white/20 group-hover:border-purple-400/50'
            }`}>
              {todo.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-200 transition-colors duration-300 ${
                  todo.completed
                    ? 'line-through text-white/50'
                    : 'text-white'
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm sm:text-base mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed ${
                    todo.completed ? 'text-white/40' : 'text-purple-200/80'
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Date and time */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/70 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden sm:inline font-medium">{formattedDate} at {formattedTime}</span>
              <span className="sm:hidden font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Status badge and arrow */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <StatusBadge completed={todo.completed} size="sm" />
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-white/40 group-hover:text-purple-300 transition-all duration-300 flex-shrink-0 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
