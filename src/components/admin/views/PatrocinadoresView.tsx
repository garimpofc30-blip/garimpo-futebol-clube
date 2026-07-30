import React from 'react';
import { Button } from '../../ui/Button';

export const PatrocinadoresView: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Patrocinadores & Parceiros</h1>
      <Button>🤝 Adicionar Patrocinador</Button>
    </div>
    <div className="bg-garimpo-navy p-6 border border-white/10 rounded-xl text-gray-400 text-center">
      Gestão de marcas exibidas no rodapé e uniformes do clube.
    </div>
  </div>
);
