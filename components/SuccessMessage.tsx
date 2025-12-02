type Props = {
  message: string;
};

export default function SuccessMessage({ message }: Props) {
  return (
    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/50 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-200 font-bold text-lg">{message}</p>
      </div>
    </div>
  );
}

