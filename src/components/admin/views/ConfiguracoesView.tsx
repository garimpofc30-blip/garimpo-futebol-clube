import React from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const ConfiguracoesView: React.FC = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-2xl font-bold text-white">Configurações do Portal</h1>
    <div className="bg-garimpo-navy p-6 border border-white/10 rounded-xl space-y-4">
      <Input label="Nome Oficial do Clube" defaultValue="Garimpo Futebol Clube" />
      <Input label="E-mail de Contato" defaultValue="contato@garimpofc.com.br" />
      <Input label="Chave PIX Oficial para Rifas/Doações" defaultValue="00.000.000/0001-00" />
      <Button>💾 Salvar Alterações</Button>
    </div>
  </div>
);
