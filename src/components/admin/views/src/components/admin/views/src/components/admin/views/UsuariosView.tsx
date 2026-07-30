import React from 'react';

export const UsuariosView: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-white">Usuários & Permissões RBAC</h1>
    <div className="bg-garimpo-navy p-6 border border-white/10 rounded-xl text-gray-400 text-center">
      Gerenciamento de papéis (Admin, Editor, Membro) sincronizado com o Supabase Auth.
    </div>
  </div>
);
