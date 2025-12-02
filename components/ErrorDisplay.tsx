import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

type Props = {
  title?: string;
  message: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
};

export default function ErrorDisplay({
  title = 'Error',
  message,
  showBackButton = false,
  backButtonText = 'Back to List',
  backButtonHref = ROUTES.HOME,
}: Props) {
  return (
    <div className="bg-red-500/20 backdrop-blur-xl border-2 border-red-400/50 rounded-3xl p-8 sm:p-10 shadow-2xl">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-200 mb-2">{title}</h1>
          <p className="text-red-100 text-base sm:text-lg">{message}</p>
        </div>
      </div>
      {showBackButton && (
        <Link
          href={backButtonHref}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          {backButtonText}
        </Link>
      )}
    </div>
  );
}

