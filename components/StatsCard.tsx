import { ReactNode } from 'react';

type Props = {
  label: string;
  value: ReactNode;
  gradient?: 'purple' | 'green' | 'blue';
};

const gradientClasses = {
  purple: 'from-purple-500/20',
  green: 'from-green-500/20',
  blue: 'from-blue-500/20',
};

export default function StatsCard({ label, value, gradient = 'purple' }: Props) {
  return (
    <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[gradient]} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="relative">
        <div className="text-sm sm:text-base text-purple-200 mb-2 font-medium">{label}</div>
        <div className="text-4xl sm:text-5xl font-extrabold text-white">{value}</div>
      </div>
    </div>
  );
}

