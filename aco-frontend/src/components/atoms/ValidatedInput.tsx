import React from 'react';
import { cn } from '../../utils/cn';

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  warning?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({ label, error, warning, className, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 outline-none transition-all",
          "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
          error ? "border-red-500 bg-red-50/50" : warning ? "border-amber-400 bg-amber-50/50" : "hover:border-slate-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-red-500 animate-pulse ml-1">{error}</p>}
      {warning && !error && <p className="text-[10px] font-bold text-amber-600 ml-1">{warning}</p>}
    </div>
  );
};
