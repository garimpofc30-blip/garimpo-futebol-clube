import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { supabase } from '../../../lib/supabaseClient';
import { Jogador } from '../../../types/jogadores';

export const JogadoresView: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalForm, setModalForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Jogador>>({
    nome: '', posicao: 'Atacante', numero: 10, ativo: true, nacionalidade: 'Brasileira'
  });

  const carregarElenco = async () => {
    setLoading(true);
    const { data } = await supabase.from('jogadores').select('*').order('numero', { ascending: true });
    if (data) setJogadores(data);
    setLoading(false);
  };

  useEffect(() => { carregarElenco(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await supabase.from('jogadores').update(formData).eq('id', formData.id);
    } else {
      await supabase.from('jogadores').insert([formData]);
    }
    setModalForm(false);
    carregarElenco();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Elenco</span></nav>
          <h1 className="text-2xl font-bold text-white">Atletas do Garimpo F.C.</h1>
        </div>
        <Button onClick={() => { setFormData({ nome: '', posicao: 'Atacante', numero: 9, ativo: true }); setModalForm(true); }}>
          ➕ Novo Atleta
        </Button>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <th className="px-6 py-3">Nº</th>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Posição</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </TableHeader>
        <tbody>
          {jogadores.map((j) => (
            <TableRow key={j.id}>
              <TableCell className="font-mono font-bold text-garimpo-gold">#{j.numero ?? 'N/A'}</TableCell>
              <TableCell className="font-semibold text-white">{j.nome}</TableCell>
              <TableCell><Badge variant="gold">{j.posicao}</Badge></TableCell>
              <TableCell><Badge variant={j.ativo ? 'success' : 'neutral'}>{j.ativo ? 'Ativo' : 'Inativo'}</Badge></TableCell>
              <TableCell className="text-right">
                <button onClick={() => { setFormData(j); setModalForm(true); }} className="text-xs text-garimpo-gold hover:underline">Editar</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalForm} onClose={() => setModalForm(false)} title="Cadastro de Atleta">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nome Completo *" value={formData.nome || ''} onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Número da Camisa" value={formData.numero ?? ''} onChange={(e) => setFormData(p => ({ ...p, numero: Number(e.target.value) }))} />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300 uppercase">Posição</label>
              <select
                value={formData.posicao}
                onChange={(e) => setFormData(p => ({ ...p, posicao: e.target.value }))}
                className="w-full bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white"
              >
                <option value="Goleiro">Goleiro</option>
                <option value="Zagueiro">Zagueiro</option>
                <option value="Lateral">Lateral</option>
                <option value="Meio-Campo">Meio-Campo</option>
                <option value="Atacante">Atacante</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalForm(false)}>Cancelar</Button>
            <Button type="submit">Salvar Atleta</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
