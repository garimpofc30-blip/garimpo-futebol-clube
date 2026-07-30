import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider">{label}</label>}
        <input
          ref={ref}
          className={`w-full bg-garimpo-navy-dark border text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-garimpo-gold transition-colors ${
            error ? 'border-red-500' : 'border-white/10'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
