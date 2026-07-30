import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { Alert } from '../../ui/Alert';
import { supabase } from '../../../lib/supabaseClient';

export const PatrocinadoresView: React.FC = () => {
  const [patrocinadores, setPatrocinadores] = useState<any[]>([]);
  const [modalForm, setModalForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({ id: '', nome: '', logo_url: '', site_url: '', ordem: 0 });

  const carregarPatrocinadores = async () => {
    const { data } = await supabase.from('patrocinadores').select('*').order('ordem', { ascending: true });
    if (data) setPatrocinadores(data);
  };

  useEffect(() => { carregarPatrocinadores(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await supabase.from('patrocinadores').update(formData).eq('id', formData.id);
      } else {
        await supabase.from('patrocinadores').insert([formData]);
      }
      setToast({ message: 'Patrocinador salvo!', type: 'success' });
      setModalForm(false);
      carregarPatrocinadores();
    } catch {
      setToast({ message: 'Erro ao salvar patrocinador.', type: 'error' });
    }
  };

  const handleExcluir = async (id: string) => {
    if (confirm('Deseja realmente remover este patrocinador?')) {
      await supabase.from('patrocinadores').delete().eq('id', id);
      carregarPatrocinadores();
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Alert message={toast.message} variant={toast.type} />}

      <div className="flex justify-between items-center">
        <div>
          <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Patrocinadores</span></nav>
          <h1 className="text-2xl font-bold text-white">Parceiros & Patrocinadores</h1>
        </div>
        <Button onClick={() => { setFormData({ id: '', nome: '', logo_url: '', site_url: '', ordem: 0 }); setModalForm(true); }}>
          ➕ Novo Patrocinador
        </Button>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <th className="px-6 py-3">Marca / Empresa</th>
            <th className="px-6 py-3">Link do Site</th>
            <th className="px-6 py-3">Ordem Exibição</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </TableHeader>
        <tbody>
          {patrocinadores.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-semibold text-white">{p.nome}</TableCell>
              <TableCell className="text-gray-400">{p.site_url || 'Nenhum'}</TableCell>
              <TableCell>{p.ordem}</TableCell>
              <TableCell className="text-right space-x-2">
                <button onClick={() => { setFormData(p); setModalForm(true); }} className="text-xs text-garimpo-gold hover:underline">Editar</button>
                <button onClick={() => handleExcluir(p.id)} className="text-xs text-red-400 hover:underline">Excluir</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalForm} onClose={() => setModalForm(false)} title={formData.id ? "Editar Patrocinador" : "Adicionar Patrocinador"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nome da Empresa *" value={formData.nome} onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} required />
          <Input label="URL da Logo *" value={formData.logo_url} onChange={(e) => setFormData(p => ({ ...p, logo_url: e.target.value }))} required />
          <Input label="Site Oficial (Link de destino)" value={formData.site_url} onChange={(e) => setFormData(p => ({ ...p, site_url: e.target.value }))} />
          <Input type="number" label="Ordem de Prioridade" value={formData.ordem} onChange={(e) => setFormData(p => ({ ...p, ordem: Number(e.target.value) }))} />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalForm(false)}>Cancelar</Button>
            <Button type="submit">Salvar Patrocinador</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
