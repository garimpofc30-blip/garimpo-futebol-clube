import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { Badge } from '../../ui/Badge';
import { supabase } from '../../../lib/supabaseClient';

export const DocumentosView: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [modalForm, setModalForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', titulo: '', categoria: 'Estatuto', arquivo_url: '' });

  const carregarDocs = async () => {
    const { data } = await supabase.from('documentos').select('*').order('created_at', { ascending: false });
    if (data) setDocs(data);
  };

  useEffect(() => { carregarDocs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await supabase.from('documentos').update(formData).eq('id', formData.id);
    } else {
      await supabase.from('documentos').insert([formData]);
    }
    setModalForm(false);
    carregarDocs();
  };

  const handleExcluir = async (id: string) => {
    if (confirm('Remover este documento oficial?')) {
      await supabase.from('documentos').delete().eq('id', id);
      carregarDocs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Transparência</span></nav>
          <h1 className="text-2xl font-bold text-white">Documentos Oficiais</h1>
        </div>
        <Button onClick={() => { setFormData({ id: '', titulo: '', categoria: 'Estatuto', arquivo_url: '' }); setModalForm(true); }}>
          📄 Publicar Documento
        </Button>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <th className="px-6 py-3">Título do Documento</th>
            <th className="px-6 py-3">Categoria</th>
            <th className="px-6 py-3">Link do Arquivo (PDF)</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </TableHeader>
        <tbody>
          {docs.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="font-semibold text-white">{d.titulo}</TableCell>
              <TableCell><Badge variant="gold">{d.categoria}</Badge></TableCell>
              <TableCell className="text-xs text-blue-400 underline overflow-hidden max-w-xs truncate">
                <a href={d.arquivo_url} target="_blank" rel="noreferrer">Acessar PDF</a>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <button onClick={() => { setFormData(d); setModalForm(true); }} className="text-xs text-garimpo-gold hover:underline">Editar</button>
                <button onClick={() => handleExcluir(d.id)} className="text-xs text-red-400 hover:underline">Excluir</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalForm} onClose={() => setModalForm(false)} title="Publicar Documento Oficial">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Título do Documento *" value={formData.titulo} onChange={(e) => setFormData(p => ({ ...p, titulo: e.target.value }))} required />
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-300 uppercase">Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData(p => ({ ...p, categoria: e.target.value }))}
              className="w-full bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white"
            >
              <option value="Estatuto">Estatuto</option>
              <option value="Ata">Ata de Reunião</option>
              <option value="Balancete">Balancete / Financeiro</option>
              <option value="Regulamento">Regulamento</option>
            </select>
          </div>
          <Input label="URL do Arquivo PDF *" value={formData.arquivo_url} onChange={(e) => setFormData(p => ({ ...p, arquivo_url: e.target.value }))} required />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalForm(false)}>Cancelar</Button>
            <Button type="submit">Salvar Documento</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
