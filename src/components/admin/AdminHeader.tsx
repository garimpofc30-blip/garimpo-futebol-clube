import React from 'react';

interface AdminHeaderProps {
  onMenuClick: () => void;
  userEmail?: string;
  userRole?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onMenuClick, 
  userEmail = 'admin@garimpofc.com.br',
  userRole = 'Administrador'
}) => {
  return (
    <header className="h-16 bg-[#0A1128] border-b border-[#D4AF37]/20 text-white flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shadow-md">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D4AF37]"
          aria-label="Abrir menu"
        >
          ☰
        </button>
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold hidden sm:inline">
          Área de Gestão Oficial
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-white">{userEmail}</p>
          <p className="text-xs text-[#D4AF37]">{userRole}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-[#0A1128] font-bold flex items-center justify-center border-2 border-[#D4AF37]">
          ADM
        </div>
        <button 
          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
          title="Sair do Painel"
        >
          🚪
        </button>
      </div>
    </header>
  );
};
