import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { RichTextEditor } from './RichTextEditor';
import { NoticiaPreviewModal } from './NoticiaPreviewModal';
import { generateSlug } from '../../../utils/noticiasHelpers';
import { noticiasService } from '../../../services/noticiasService';
import { Noticia, StatusNoticia } from '../../../types/noticias';

interface NoticiaFormProps {
  noticiaInicial?: Noticia | null;
  onSuccess: () => void;
  onCancel: () => void;
  showToast: (msg: string, type: 'success' | 'error') => void;
}

export const NoticiaForm: React.FC<NoticiaFormProps> = ({
  noticiaInicial,
  onSuccess,
  onCancel,
  showToast,
}) => {
  const [formData, setFormData] = useState({
    id: noticiaInicial?.id || '',
    titulo: noticiaInicial?.titulo || '',
    slug: noticiaInicial?.slug || '',
    resumo: noticiaInicial?.resumo || '',
    conteudo: noticiaInicial?.conteudo || '',
    imagem_capa: noticiaInicial?.imagem_capa || '',
    categoria: noticiaInicial?.categoria || 'Geral',
    status: (noticiaInicial?.status || 'rascunho') as StatusNoticia,
    data_publicacao: noticiaInicial?.data_publicacao || new Date().toISOString().split('T')[0],
    meta_titulo: noticiaInicial?.meta_titulo || '',
    meta_descricao: noticiaInicial?.meta_descricao || '',
    tags: noticiaInicial?.tags?.join(', ') || '',
  });

  const [loading, setLoading] = useState(false);
  const [slugManual, setSlugManual] = useState(!!noticiaInicial?.slug);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-geração do Slug
  useEffect(() => {
    if (!slugManual && formData.titulo) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.titulo) }));
    }
  }, [formData.titulo, slugManual]);

  // Alerta de alterações não salvas antes de sair
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Auto Save Rascunho local
  useEffect(() => {
    if (isDirty && !formData.id) {
      const timer = setTimeout(() => {
        localStorage.setItem('gfc_noticia_rascunho', JSON.stringify(formData));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formData, isDirty]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const url = await noticiasService.uploadImagemCapa(file);
      handleChange('imagem_capa', url);
      showToast('Imagem carregada com sucesso!', 'success');
    } catch (err) {
      showToast('Erro ao realizar upload da imagem.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo || !formData.resumo || !formData.conteudo) {
      showToast('Preencha todos os campos obrigatórios (*).', 'error');
      return;
    }

    try {
      setLoading(true);

      const isSlugValido = await noticiasService.verificarSlugUnico(formData.slug, formData.id);
      if (!isSlugValido) {
        showToast('O Slug informado já está em uso por outra notícia.', 'error');
        setLoading(false);
        return;
      }

      await noticiasService.salvar({
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });

      setIsDirty(false);
      localStorage.removeItem('gfc_noticia_rascunho');
      showToast('Notícia salva com sucesso!', 'success');
      onSuccess();
    } catch (err) {
      showToast('Erro ao salvar notícia.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            {formData.id ? 'Editar Notícia' : 'Nova Notícia'}
          </h2>
          <p className="text-xs text-gray-400">Preencha os detalhes e conteúdo da matéria.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="button" variant="secondary" onClick={() => setPreviewOpen(true)}>
            👁️ Preview
          </Button>
          <Button type="submit" isLoading={loading}>
            💾 Salvar Notícia
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal (Conteúdo) */}
        <div className="lg:col-span-2 space-y-6">
          <Input
            label="Título *"
            value={formData.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
            placeholder="Ex: Garimpo F.C. vence clássico decisivo"
            required
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                Slug (URL Amigável) *
              </label>
              <button
                type="button"
                onClick={() => setSlugManual(!slugManual)}
                className="text-xs text-garimpo-gold hover:underline"
              >
                {slugManual ? 'Gerar Automaticamente' : 'Editar Manualmente'}
              </button>
            </div>
            <Input
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              disabled={!slugManual}
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
              Resumo / Ementa *
            </label>
            <textarea
              value={formData.resumo}
              onChange={(e) => handleChange('resumo', e.target.value)}
              rows={3}
              className="w-full bg-garimpo-navy-dark border border-white/10 rounded-lg p-3 text-sm text-white focus:border-garimpo-gold focus:outline-none"
              placeholder="Breve resumo para ser exibido na busca e cards..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">
              Conteúdo da Notícia *
            </label>
            <RichTextEditor
              value={formData.conteudo}
              onChange={(val) => handleChange('conteudo', val)}
            />
          </div>
        </div>

        {/* Coluna Lateral (Configurações e SEO) */}
        <div className="space-y-6">
          {/* Status & Publicação */}
          <div className="bg-garimpo-navy p-5 rounded-xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-garimpo-gold uppercase tracking-wider">Publicação</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as StatusNoticia)}
                className="w-full bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-garimpo-gold focus:outline-none"
              >
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
                <option value="agendado">Agendado</option>
              </select>
            </div>

            <Input
              type="date"
              label="Data de Publicação"
              value={formData.data_publicacao}
              onChange={(e) => handleChange('data_publicacao', e.target.value)}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300">Categoria</label>
              <select
                value={formData.categoria}
                onChange={(e) => handleChange('categoria', e.target.value)}
                className="w-full bg-garimpo-navy-dark border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-garimpo-gold focus:outline-none"
              >
                <option value="Geral">Geral</option>
                <option value="Jogos">Jogos</option>
                <option value="Elenco">Elenco</option>
                <option value="Institucional">Institucional</option>
                <option value="Base">Categorias de Base</option>
              </select>
            </div>
          </div>

          {/* Upload de Imagem */}
          <div className="bg-garimpo-navy p-5 rounded-xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-garimpo-gold uppercase tracking-wider">Imagem de Capa</h3>
            
            {formData.imagem_capa && (
              <img
                src={formData.imagem_capa}
                alt="Capa"
                className="w-full h-36 object-cover rounded-lg border border-white/10"
              />
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-garimpo-gold file:text-garimpo-navy cursor-pointer"
            />
          </div>

          {/* Otimização SEO */}
          <div className="bg-garimpo-navy p-5 rounded-xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-garimpo-gold uppercase tracking-wider">SEO</h3>
            <Input
              label="Meta Título"
              value={formData.meta_titulo}
              onChange={(e) => handleChange('meta_titulo', e.target.value)}
            />
            <Input
              label="Tags (separadas por vírgula)"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
            />
          </div>
        </div>
      </div>

      <NoticiaPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        noticia={formData}
      />
    </form>
  );
};
