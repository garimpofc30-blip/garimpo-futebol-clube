import React from 'react';

interface AlertProps {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export const Alert: React.FC<AlertProps> = ({ title, message, variant = 'info' }) => {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    error: "border-red-500/30 bg-red-500/10 text-red-300",
  };

  return (
    <div className={`border p-4 rounded-xl flex gap-3 text-sm ${styles[variant]}`}>
      <div>
        {title && <h4 className="font-bold mb-1">{title}</h4>}
        <p>{message}</p>
      </div>
    </div>
  );
};
