export type StatusNoticia = 'rascunho' | 'publicado' | 'agendado';

export interface Noticia {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  imagem_capa?: string | null;
  categoria: string;
  tags?: string[];
  autor_id?: string | null;
  autor?: {
    nome: string;
    email: string;
  };
  publicado: boolean;
  status: StatusNoticia;
  data_publicacao?: string | null;
  meta_titulo?: string | null;
  meta_descricao?: string | null;
  palavras_chave?: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface NoticiaFiltros {
  busca: string;
  categoria: string;
  status: string;
  autorId: string;
  ordem: 'desc' | 'asc';
  pagina: number;
  itensPorPagina: number;
}
