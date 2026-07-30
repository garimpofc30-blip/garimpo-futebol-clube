import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { supabase } from '../../../lib/supabaseClient';

export const ProdutosView: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [modalForm, setModalForm] = useState(false);
  const [formData, setFormData] = useState({ nome: '', preco: 0, estoque: 10, categoria: 'Uniformes', imagem_principal: '', ativo: true });

  const carregarProdutos = async () => {
    const { data } = await supabase.from('produtos').select('*');
    if (data) setProdutos(data);
  };

  useEffect(() => { carregarProdutos(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('produtos').insert([formData]);
    setModalForm(false);
    carregarProdutos();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Loja</span></nav>
          <h1 className="text-2xl font-bold text-white">Produtos Oficiais</h1>
        </div>
        <Button onClick={() => setModalForm(true)}>🛍️ Novo Produto</Button>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <th className="px-6 py-3">Produto</th>
            <th className="px-6 py-3">Categoria</th>
            <th className="px-6 py-3">Preço</th>
            <th className="px-6 py-3">Estoque</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </TableHeader>
        <tbody>
          {produtos.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-semibold text-white">{p.nome}</TableCell>
              <TableCell><Badge variant="gold">{p.categoria}</Badge></TableCell>
              <TableCell className="font-mono text-emerald-400 font-bold">R$ {Number(p.preco).toFixed(2)}</TableCell>
              <TableCell>{p.estoque} un.</TableCell>
              <TableCell className="text-right">
                <button className="text-xs text-garimpo-gold hover:underline">Editar</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalForm} onClose={() => setModalForm(false)} title="Adicionar Produto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nome do Produto *" onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" step="0.01" label="Preço (R$) *" onChange={(e) => setFormData(p => ({ ...p, preco: Number(e.target.value) }))} required />
            <Input type="number" label="Estoque *" onChange={(e) => setFormData(p => ({ ...p, estoque: Number(e.target.value) }))} required />
          </div>
          <Input label="URL da Imagem" onChange={(e) => setFormData(p => ({ ...p, imagem_principal: e.target.value }))} />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalForm(false)}>Cancelar</Button>
            <Button type="submit">Cadastrar Produto</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
