import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { Skeleton } from '../../ui/Skeleton';
import { Alert } from '../../ui/Alert';
import { jogosService } from '../../../services/jogosService';
import { Jogo, MatchStatus } from '../../../types/jogos';

export const JogosView: React.FC = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalForm, setModalForm] = useState(false);
  const [modalExcluir, setModalExcluir] = useState<{ open: boolean; id?: string }>({ open: false });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState<Partial<Jogo>>({
    adversario: '',
    campeonato: 'Campeonato Amador',
    data_jogo: new Date().toISOString().split('T')[0],
    horario: '15:00',
    local: 'Estádio Municipal',
    placar_garimpo: 0,
    placar_adversario: 0,
    status: 'agendado',
  });

  const carregarJogos = async () => {
    try {
      setLoading(true);
      const data = await jogosService.listar();
      setJogos(data);
    } catch {
      showToast('Erro ao carregar lista de jogos.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarJogos(); }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jogosService.salvar(formData);
      showToast('Jogo salvo com sucesso!', 'success');
      setModalForm(false);
      carregarJogos();
    } catch {
      showToast('Erro ao salvar partida.', 'error');
    }
  };

  const handleExcluir = async () => {
    if (!modalExcluir.id) return;
    try {
      await jogosService.excluir(modalExcluir.id);
      showToast('Partida removida com sucesso.', 'success');
      setModalExcluir({ open: false });
      carregarJogos();
    } catch {
      showToast('Erro ao remover partida.', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Alert message={toast.message} variant={toast.type} />}

      <div className="flex justify-between items-center">
        <div>
          <nav className="text-xs text-gray-400 mb-1">Admin / <span className="text-garimpo-gold font-semibold">Jogos</span></nav>
          <h1 className="text-2xl font-bold text-white">Calendário & Placar de Jogos</h1>
        </div>
        <Button onClick={() => {
          setFormData({ adversario: '', campeonato: '', data_jogo: '', horario: '15:00', local: '', status: 'agendado' });
          setModalForm(true);
        }}>➕ Agendar Jogo</Button>
      </div>

      {loading ? <Skeleton className="h-48 w-full" /> : (
        <Table>
          <TableHeader>
            <tr>
              <th className="px-6 py-3">Adversário</th>
              <th className="px-6 py-3">Campeonato</th>
              <th className="px-6 py-3">Data / Hora</th>
              <th className="px-6 py-3">Placar</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </TableHeader>
          <tbody>
            {jogos.map((jogo) => (
              <TableRow key={jogo.id}>
                <TableCell className="font-semibold text-white">{jogo.adversario}</TableCell>
                <TableCell><Badge variant="gold">{jogo.campeonato}</Badge></TableCell>
                <TableCell>{jogo.data_jogo} às {jogo.horario}</TableCell>
                <TableCell className="font-mono text-garimpo-gold font-bold">
                  {jogo.placar_garimpo ?? '-'} x {jogo.placar_adversario ?? '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={jogo.status === 'ao_vivo' ? 'danger' : jogo.status === 'finalizado' ? 'neutral' : 'info'}>
                    {jogo.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <button onClick={() => { setFormData(jogo); setModalForm(true); }} className="text-xs text-garimpo-gold hover:underline">Editar</button>
                  <button onClick={() => setModalExcluir({ open: true, id: jogo.id })} className="text-xs text-red-400 hover:underline">Excluir</button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal Formulário */}
      <Modal isOpen={modalForm} onClose={() => setModalForm(false)} title={formData.id ? "Editar Partida" : "Cadastrar Nova Partida"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Adversário *" value={formData.adversario || ''} onChange={(e) => setFormData(p => ({ ...p, adversario: e.target.value }))} required />
          <Input label="Campeonato *" value={formData.campeonato || ''} onChange={(e) => setFormData(p => ({ ...p, campeonato: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" label="Data *" value={formData.data_jogo || ''} onChange={(e) => setFormData(p => ({ ...p, data_jogo: e.target.value }))} required />
            <Input type="time" label="Horário *" value={formData.horario || ''} onChange={(e) => setFormData(p => ({ ...p, horario: e.target.value }))} required />
          </div>
          <Input label="Local / Estádio *" value={formData.local || ''} onChange={(e) => setFormData(p => ({ ...p, local: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Placar Garimpo" value={formData.placar_garimpo ?? ''} onChange={(e) => setFormData(p => ({ ...p, placar_garimpo: Number(e.target.value) }))} />
            <Input type="number" label="Placar Adversário" value={formData.placar_adversario ?? ''} onChange={(e) => setFormData(p => ({ ...p, placar_adversario: Number(e.target.value) }))} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-300 uppercase">Status do Jogo</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(p => ({ ...p, status: e.target.value as MatchStatus }))}
              className="w-full bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white"
            >
              <option value="agendado">Agendado</option>
              <option value="ao_vivo">Ao Vivo</option>
              <option value="finalizado">Finalizado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalForm(false)}>Cancelar</Button>
            <Button type="submit">Salvar Partida</Button>
          </div>
        </form>
      </Modal>

      {/* Modal Exclusão */}
      <Modal isOpen={modalExcluir.open} onClose={() => setModalExcluir({ open: false })} title="Excluir Jogo">
        <p className="text-sm text-gray-300">Tem certeza que deseja remover este jogo do calendário?</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setModalExcluir({ open: false })}>Cancelar</Button>
          <Button variant="danger" onClick={handleExcluir}>Remover</Button>
        </div>
      </Modal>
    </div>
  );
};
