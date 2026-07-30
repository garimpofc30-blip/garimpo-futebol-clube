import React from 'react';
import { Button } from '../../ui/Button';

export const GaleriaView: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Galeria de Fotos Oficial</h1>
      <Button>🖼️ Adicionar Foto</Button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="border border-white/10 rounded-xl p-8 text-center bg-garimpo-navy text-gray-400 col-span-full">
        Nenhuma foto postada no momento.
      </div>
    </div>
  </div>
);
