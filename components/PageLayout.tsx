import { ReactNode } from 'react';
import AnimatedBackground from './AnimatedBackground';

type Props = {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '7xl';
  className?: string;
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '7xl': 'max-w-7xl',
};

export default function PageLayout({ 
  children, 
  maxWidth = '3xl',
  className = '' 
}: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      <div className={`relative ${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 ${className}`}>
        {children}
      </div>
    </main>
  );
}

