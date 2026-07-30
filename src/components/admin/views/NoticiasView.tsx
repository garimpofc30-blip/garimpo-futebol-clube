import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableRow, TableCell } from '../../ui/Table';
import { Modal } from '../../ui/Modal';
import { Skeleton } from '../../ui/Skeleton';
import { Alert } from '../../ui/Alert';
import { NoticiaForm } from '../noticias/NoticiaForm';
import { noticiasService } from '../../../services/noticiasService';
import { Noticia, NoticiaFiltros } from '../../../types/noticias';

export const NoticiasView: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState<Noticia | null>(null);

  // Estados de confirmação e Toast
  const [modalExcluir, setModalExcluir] = useState<{ open: boolean; id?: string }>({ open: false });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [filtros, setFiltros] = useState<NoticiaFiltros>({
    busca: '',
    categoria: '',
    status: '',
    autorId: '',
    ordem: 'desc',
    pagina: 1,
    itensPorPagina: 8,
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const carregarNoticias = useCallback(async () => {
    try {
      setLoading(true);
      const res = await noticiasService.listar(filtros);
      setNoticias(res.data);
      setTotal(res.total);
    } catch (err) {
      showToast('Erro ao carregar lista de notícias.', 'error');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarNoticias();
  }, [carregarNoticias]);

  const handleExcluir = async () => {
    if (!modalExcluir.id) return;
    try {
      await noticiasService.excluir(modalExcluir.id);
      showToast('Notícia excluída com sucesso.', 'success');
      setModalExcluir({ open: false });
      carregarNoticias();
    } catch (err) {
      showToast('Erro ao excluir notícia.', 'error');
    }
  };

  const handleDuplicar = async (noticia: Noticia) => {
    try {
      await noticiasService.salvar({
        ...noticia,
        id: undefined,
        titulo: `${noticia.titulo} (Cópia)`,
        slug: `${noticia.slug}-copia-${Date.now()}`,
        status: 'rascunho',
      });
      showToast('Notícia duplicada como rascunho.', 'success');
      carregarNoticias();
    } catch (err) {
      showToast('Erro ao duplicar notícia.', 'error');
    }
  };

  if (modoEdicao) {
    return (
      <NoticiaForm
        noticiaInicial={noticiaSelecionada}
        onSuccess={() => {
          setModoEdicao(false);
          setNoticiaSelecionada(null);
          carregarNoticias();
        }}
        onCancel={() => {
          setModoEdicao(false);
          setNoticiaSelecionada(null);
        }}
        showToast={showToast}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Alert message={toast.message} variant={toast.type} />}

      {/* Header com Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <nav className="text-xs text-gray-400 mb-1">
            <span>Admin</span> / <span className="text-garimpo-gold font-semibold">Notícias</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">Gerenciamento de Notícias</h1>
        </div>
        <Button
          onClick={() => {
            setNoticiaSelecionada(null);
            setModoEdicao(true);
          }}
        >
          ➕ Nova Notícia
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-garimpo-navy p-4 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Buscar título..."
          value={filtros.busca}
          onChange={(e) => setFiltros((p) => ({ ...p, busca: e.target.value, pagina: 1 }))}
        />
        <select
          value={filtros.categoria}
          onChange={(e) => setFiltros((p) => ({ ...p, categoria: e.target.value, pagina: 1 }))}
          className="bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-garimpo-gold focus:outline-none"
        >
          <option value="">Todas as Categorias</option>
          <option value="Geral">Geral</option>
          <option value="Jogos">Jogos</option>
          <option value="Elenco">Elenco</option>
        </select>
        <select
          value={filtros.status}
          onChange={(e) => setFiltros((p) => ({ ...p, status: e.target.value, pagina: 1 }))}
          className="bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-garimpo-gold focus:outline-none"
        >
          <option value="">Todos os Status</option>
          <option value="publicado">Publicados</option>
          <option value="rascunho">Rascunhos</option>
        </select>
        <select
          value={filtros.ordem}
          onChange={(e) => setFiltros((p) => ({ ...p, ordem: e.target.value as 'asc' | 'desc' }))}
          className="bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-garimpo-gold focus:outline-none"
        >
          <option value="desc">Mais recentes primeiro</option>
          <option value="asc">Mais antigas primeiro</option>
        </select>
      </div>

      {/* Tabela de Notícias */}
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <th className="px-6 py-3">Capa</th>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Autor</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </TableHeader>
          <tbody>
            {noticias.length === 0 ? (
              <TableRow>
                <TableCell className="text-center py-8 text-gray-400" colSpan={7}>
                  Nenhuma notícia encontrada.
                </TableCell>
              </TableRow>
            ) : (
              noticias.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.imagem_capa ? (
                      <img src={item.imagem_capa} alt="" className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                    ) : (
                      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-xs text-gray-500">Sem foto</div>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold text-white max-w-xs truncate">{item.titulo}</TableCell>
                  <TableCell><Badge variant="gold">{item.categoria}</Badge></TableCell>
                  <TableCell>{item.autor?.nome || 'Sistema'}</TableCell>
                  <TableCell>
                    <Badge variant={item.publicado ? 'success' : 'warning'}>
                      {item.publicado ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    {new Date(item.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <button
                      onClick={() => {
                        setNoticiaSelecionada(item);
                        setModoEdicao(true);
                      }}
                      className="text-xs text-garimpo-gold hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDuplicar(item)}
                      className="text-xs text-gray-400 hover:underline"
                    >
                      Duplicar
                    </button>
                    <button
                      onClick={() => setModalExcluir({ open: true, id: item.id })}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Excluir
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Paginação */}
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Mostrando {noticias.length} de {total} notícias</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={filtros.pagina === 1}
            onClick={() => setFiltros((p) => ({ ...p, pagina: p.pagina - 1 }))}
          >
            Anterior
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={filtros.pagina * filtros.itensPorPagina >= total}
            onClick={() => setFiltros((p) => ({ ...p, pagina: p.pagina + 1 }))}
          >
            Próxima
          </Button>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={modalExcluir.open}
        onClose={() => setModalExcluir({ open: false })}
        title="Confirmar Exclusão"
      >
        <p className="text-sm text-gray-300">
          Tem certeza de que deseja excluir esta notícia? Esta ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setModalExcluir({ open: false })}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleExcluir}>
            Sim, Excluir
          </Button>
        </div>
      </Modal>
    </div>
  );
};
