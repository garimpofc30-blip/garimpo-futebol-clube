import React from 'react';
import { Button } from '../../ui/Button';

export const DocumentosView: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Portal da Transparência & Documentos</h1>
      <Button>📄 Publicar Documento</Button>
    </div>
    <div className="bg-garimpo-navy p-6 border border-white/10 rounded-xl text-gray-400 text-center">
      Área para gestão de Atas, Balancetes e Estatutos do Garimpo F.C.
    </div>
  </div>
);
