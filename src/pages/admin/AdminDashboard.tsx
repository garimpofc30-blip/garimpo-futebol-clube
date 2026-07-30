import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DashboardView } from '../../components/admin/views/DashboardView';
import { AdminTab } from '../../types/admin';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Componente de Espaço Reservado para Módulos
  const ModulePlaceholder = ({ title }: { title: string }) => (
    <div className="bg-[#0A1128] border border-white/10 rounded-xl p-8 text-center space-y-3">
      <h2 className="text-xl font-bold text-[#D4AF37]">{title}</h2>
      <p className="text-sm text-gray-400 max-w-md mx-auto">
        Estrutura de navegação configurada. Pronto para a integração dos componentes de listagem e formulários (CRUD).
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050814] text-gray-100 flex font-sans">
      {/* Sidebar Fixa */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Conteúdo Principal */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'noticias' && <ModulePlaceholder title="Módulo de Notícias" />}
          {activeTab === 'jogos' && <ModulePlaceholder title="Módulo de Jogos" />}
          {activeTab === 'jogadores' && <ModulePlaceholder title="Módulo de Jogadores" />}
          {activeTab === 'produtos' && <ModulePlaceholder title="Módulo da Loja Oficial" />}
          {activeTab === 'rifas' && <ModulePlaceholder title="Módulo de Rifas & Ações" />}
          {activeTab === 'galeria' && <ModulePlaceholder title="Módulo da Galeria" />}
          {activeTab === 'documentos' && <ModulePlaceholder title="Módulo de Documentos" />}
          {activeTab === 'patrocinadores' && <ModulePlaceholder title="Módulo de Patrocinadores" />}
          {activeTab === 'usuarios' && <ModulePlaceholder title="Módulo de Usuários" />}
          {activeTab === 'configuracoes' && <ModulePlaceholder title="Configurações do Sistema" />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
