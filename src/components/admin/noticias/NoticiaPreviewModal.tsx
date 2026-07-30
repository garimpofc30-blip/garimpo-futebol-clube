import React from 'react';
import { Modal } from '../../ui/Modal';
import { Badge } from '../../ui/Badge';

interface NoticiaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  noticia: {
    titulo: string;
    resumo: string;
    conteudo: string;
    imagem_capa?: string;
    categoria: string;
    data_publicacao?: string;
  };
}

export const NoticiaPreviewModal: React.FC<NoticiaPreviewModalProps> = ({
  isOpen,
  onClose,
  noticia,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pré-visualização do Portal">
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
        <div className="space-y-3">
          <Badge variant="gold">{noticia.categoria || 'Sem categoria'}</Badge>
          <h1 className="text-2xl font-bold text-white font-display leading-tight">
            {noticia.titulo || 'Título da Notícia'}
          </h1>
          <p className="text-sm text-gray-300 italic border-l-2 border-garimpo-gold pl-3">
            {noticia.resumo || 'Resumo explicativo da publicação...'}
          </p>
          <p className="text-xs text-gray-400">
            Publicado em: {noticia.data_publicacao ? new Date(noticia.data_publicacao).toLocaleDateString('pt-BR') : 'Hoje'}
          </p>
        </div>

        {noticia.imagem_capa && (
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={noticia.imagem_capa}
              alt={noticia.titulo}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert max-w-none text-sm text-gray-200 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: noticia.conteudo || '<p class="text-gray-500">Sem conteúdo inserido.</p>' }}
        />
      </div>
    </Modal>
  );
};
