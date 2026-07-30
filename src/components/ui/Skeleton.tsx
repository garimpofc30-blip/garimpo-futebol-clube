import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} />
);

export const CardSkeleton: React.FC = () => (
  <div className="bg-garimpo-navy border border-white/10 rounded-xl p-6 space-y-4">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);
