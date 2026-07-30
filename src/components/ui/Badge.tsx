import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold' }) => {
  const styles = {
    gold: "bg-garimpo-gold/15 text-garimpo-gold border-garimpo-gold/30",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    danger: "bg-red-500/15 text-red-400 border-red-500/30",
    info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    neutral: "bg-gray-500/15 text-gray-300 border-gray-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  );
};
