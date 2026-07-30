import React from 'react';
import { AdminTab } from '../../types/admin';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen 
}) => {
  const menuItems: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'noticias', label: 'Notícias', icon: '📰' },
    { id: 'jogos', label: 'Jogos & Placar', icon: '⚽' },
    { id: 'jogadores', label: 'Elenco / Jogadores', icon: '🏃' },
    { id: 'produtos', label: 'Loja Oficial', icon: '🛍️' },
    { id: 'rifas', label: 'Rifas & Ações', icon: '🎟️' },
    { id: 'galeria', label: 'Galeria de Fotos', icon: '🖼️' },
    { id: 'documentos', label: 'Transparência / Docs', icon: '📄' },
    { id: 'patrocinadores', label: 'Patrocinadores', icon: '🤝' },
    { id: 'usuarios', label: 'Usuários & Permissões', icon: '👥' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay para telas menores */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-[#0A1128] text-white flex flex-col justify-between border-r border-[#D4AF37]/20 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header do Menu */}
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center font-bold text-[#0A1128]">
                GFC
              </div>
              <span className="font-bold tracking-wider text-[#D4AF37]">GARIMPO F.C.</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navegação */}
          <nav className="p-4 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-[#D4AF37] text-[#0A1128] font-bold shadow-md shadow-[#D4AF37]/20' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-white/10 text-xs text-center text-gray-400">
          <p>Painel Administrativo v1.0</p>
          <p className="text-[#D4AF37] mt-0.5">Garimpo Futebol Clube</p>
        </div>
      </aside>
    </>
  );
};
