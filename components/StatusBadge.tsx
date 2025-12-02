type Props = {
  completed: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md';
};

export default function StatusBadge({ completed, showIcon = true, size = 'md' }: Props) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm sm:text-base',
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center rounded-xl font-bold backdrop-blur-sm border transition-all duration-300 ${sizeClasses[size]} ${
        completed
          ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/30 shadow-lg shadow-green-500/20'
          : 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 border-amber-400/30 shadow-lg shadow-amber-500/20'
      }`}
    >
      {showIcon && (
        <>
          {completed ? (
            <svg className={`${iconSizeClasses[size]} mr-2`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className={`${iconSizeClasses[size]} mr-2 animate-pulse`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          )}
        </>
      )}
      {completed ? 'Completed' : 'Pending'}
    </span>
  );
}

