import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

type Props = {
  href?: string;
  text?: string;
};

export default function BackButton({ 
  href = ROUTES.HOME, 
  text = 'Back to List' 
}: Props) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-purple-200 hover:text-white mb-6 transition-all duration-300 font-medium"
    >
      <svg
        className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {text}
    </Link>
  );
}

