type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-red-500/20 backdrop-blur-xl border-2 border-red-400/50 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-red-200 font-bold text-lg">{message}</p>
      </div>
    </div>
  );
}

