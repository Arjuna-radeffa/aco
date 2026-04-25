import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hoverable = true }) => {
  return (
    <div className={cn(
      "glass-card p-6 border",
      hoverable && "hover:scale-[1.02] hover:shadow-2xl transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
};
