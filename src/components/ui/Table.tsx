import React from 'react';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-garimpo-navy">
    <table className="w-full text-left border-collapse text-sm text-gray-300">{children}</table>
  </div>
);

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-garimpo-navy-light text-xs uppercase tracking-wider text-garimpo-gold border-b border-white/10">
    {children}
  </thead>
);

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">{children}</tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
);
