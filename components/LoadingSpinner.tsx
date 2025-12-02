type Props = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
};

export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md',
  fullPage = false 
}: Props) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
  };

  const spinner = (
    <div className="text-center">
      <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
        <div className="relative">
          <div className={`animate-spin rounded-full border-4 border-purple-500/30 border-t-purple-500 ${sizeClasses[size]}`}></div>
          <div className={`absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-blue-500 animation-delay-150 ${sizeClasses[size]}`}></div>
        </div>
      </div>
      <p className={`text-purple-200 font-semibold ${textSizeClasses[size]}`}>{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 sm:p-16 lg:p-20">
        {spinner}
      </div>
    );
  }

  return spinner;
}

