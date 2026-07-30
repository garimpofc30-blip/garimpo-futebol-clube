import React from 'react';
import { StatCardProps } from '../../types/admin';

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, trend }) => {
  return (
    <div className="bg-[#0A1128] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
          {change && (
            <p className={`text-xs mt-2 flex items-center gap-1 ${
              trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
            }`}>
              <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'}</span>
              <span>{change}</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
