type Props = {
  percentage: number;
  label?: string;
};

export default function ProgressBar({ percentage, label = 'Progress' }: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-purple-200 font-semibold text-sm sm:text-base">{label}</span>
        <span className="text-white font-bold text-lg sm:text-xl">{percentage}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 sm:h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

