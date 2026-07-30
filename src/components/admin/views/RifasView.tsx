import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { supabase } from '../../../lib/supabaseClient';

export const RifasView: React.FC = () => {
  const [rifas, setRifas] = useState<any[]>([]);
  const [modalForm, setModalForm] = useState(false);
  const [formData, setFormData] = useState({ titulo: '', premio: '', valor_numero: 10, quantidade_numeros: 100, status: 'ativo' });

  const carregarRifas = async () => {
    const { data } = await supabase.from('rifas').select('*');
    if (data) setRifas(data);
  };

  useEffect(() => { carregarRifas(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('rifas').insert([formData]);
    setModalForm(false);
    carregarRifas();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Rifas</span></nav>
          <h1 className="text-2xl font-bold text-white">Rifas & Ações de Arrecadação</h1>
        </div>
        <Button onClick={() => setModalForm(true)}>🎟️ Criar Rifa</Button>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <th className="px-6 py-3">Título</th>
            <th className="px-6 py-3">Prêmio</th>
            <th className="px-6 py-3">Valor por Cota</th>
            <th className="px-6 py-3">Qtd. Números</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </TableHeader>
        <tbody>
          {rifas.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-semibold text-white">{r.titulo}</TableCell>
              <TableCell>{r.premio}</TableCell>
              <TableCell className="font-mono text-garimpo-gold">R$ {Number(r.valor_numero).toFixed(2)}</TableCell>
              <TableCell>{r.quantidade_numeros} números</TableCell>
              <TableCell><Badge variant="success">{r.status}</Badge></TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalForm} onClose={() => setModalForm(false)} title="Nova Rifa Oficial">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Título da Ação *" onChange={(e) => setFormData(p => ({ ...p, titulo: e.target.value }))} required />
          <Input label="Prêmio *" onChange={(e) => setFormData(p => ({ ...p, premio: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" step="0.01" label="Valor por Cota (R$) *" onChange={(e) => setFormData(p => ({ ...p, valor_numero: Number(e.target.value) }))} required />
            <Input type="number" label="Quantidade de Bilhetes *" onChange={(e) => setFormData(p => ({ ...p, quantidade_numeros: Number(e.target.value) }))} required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalForm(false)}>Cancelar</Button>
            <Button type="submit">Lançar Rifa</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
