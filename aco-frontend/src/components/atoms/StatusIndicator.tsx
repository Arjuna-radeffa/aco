import React from 'react';
import { cn } from '../../utils/cn';

interface StatusIndicatorProps {
  status: 'healthy' | 'at_risk' | 'critical';
  showLabel?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, showLabel = true }) => {
  const configs = {
    healthy: { color: 'bg-emerald-500', shadow: 'shadow-emerald-500/50', label: 'Healthy' },
    at_risk: { color: 'bg-amber-500', shadow: 'shadow-amber-500/50', label: 'At Risk' },
    critical: { color: 'bg-red-500', shadow: 'shadow-red-500/50', label: 'Critical' }
  };

  const config = configs[status];

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "w-2.5 h-2.5 rounded-full shadow-[0_0_8px] animate-pulse",
        config.color,
        config.shadow
      )} />
      {showLabel && (
        <span className={cn("text-[10px] font-black uppercase tracking-widest", 
          status === 'healthy' ? 'text-emerald-600' : status === 'at_risk' ? 'text-amber-600' : 'text-red-600'
        )}>
          {config.label}
        </span>
      )}
    </div>
  );
};
