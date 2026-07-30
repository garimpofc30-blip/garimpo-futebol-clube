import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Alert } from '../../ui/Alert';
import { Skeleton } from '../../ui/Skeleton';
import { supabase } from '../../../lib/supabaseClient';

export const ConfiguracoesView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [config, setConfig] = useState({
    id: '',
    nome_clube: '',
    email_contato: '',
    chave_pix: '',
    instagram: '',
    youtube: '',
    facebook: '',
  });

  const carregarConfiguracoes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('configuracoes').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setConfig(data);
    } catch {
      setToast({ message: 'Erro ao carregar configurações.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarConfiguracoes(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (config.id) {
        await supabase.from('configuracoes').update(config).eq('id', config.id);
      } else {
        const { data } = await supabase.from('configuracoes').insert([config]).select().single();
        if (data) setConfig(data);
      }
      setToast({ message: 'Configurações salvas com sucesso!', type: 'success' });
    } catch {
      setToast({ message: 'Erro ao salvar alterações.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      {toast && <Alert message={toast.message} variant={toast.type} />}

      <div>
        <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Configurações</span></nav>
        <h1 className="text-2xl font-bold text-white">Editar Informações Gerais do Clube</h1>
        <p className="text-xs text-gray-400 mt-1">Atualize os dados do Garimpo F.C. sem precisar mexer em código.</p>
      </div>

      <form onSubmit={handleSave} className="bg-garimpo-navy p-6 border border-white/10 rounded-xl space-y-4">
        <Input 
          label="Nome Oficial do Clube" 
          value={config.nome_clube} 
          onChange={(e) => setConfig(p => ({ ...p, nome_clube: e.target.value }))} 
          required 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="E-mail Principal" 
            type="email" 
            value={config.email_contato} 
            onChange={(e) => setConfig(p => ({ ...p, email_contato: e.target.value }))} 
          />
          <Input 
            label="Chave PIX Oficial (para rifas/doações)" 
            value={config.chave_pix} 
            onChange={(e) => setConfig(p => ({ ...p, chave_pix: e.target.value }))} 
          />
        </div>

        <h3 className="text-sm font-semibold text-garimpo-gold pt-2 uppercase">Redes Sociais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            label="Instagram (@usuario)" 
            value={config.instagram} 
            onChange={(e) => setConfig(p => ({ ...p, instagram: e.target.value }))} 
          />
          <Input 
            label="YouTube (Canal)" 
            value={config.youtube} 
            onChange={(e) => setConfig(p => ({ ...p, youtube: e.target.value }))} 
          />
          <Input 
            label="Facebook" 
            value={config.facebook} 
            onChange={(e) => setConfig(p => ({ ...p, facebook: e.target.value }))} 
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : '💾 Salvar Alterações'}
          </Button>
        </div>
      </form>
    </div>
  );
};
