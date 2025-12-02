import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

type Props = {
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
};

export default function EmptyState({
  title = 'No todos yet',
  message = 'Get started by creating your first todo item and stay on top of your tasks.',
  actionText = 'Create Your First Todo',
  actionHref = ROUTES.CREATE_TODO,
}: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 sm:p-16 lg:p-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-xl border border-white/20 shadow-2xl">
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-lg sm:text-xl text-purple-200 mb-10 leading-relaxed">{message}</p>
        <Link
          href={actionHref}
          className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
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
          {actionText}
        </Link>
      </div>
    </div>
  );
}

