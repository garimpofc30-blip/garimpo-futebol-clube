import { supabase } from '../lib/supabaseClient';
import { Noticia, NoticiaFiltros } from '../types/noticias';

export const noticiasService = {
  async listar(filtros: NoticiaFiltros) {
    let query = supabase
      .from('noticias')
      .select('*, autor:profiles(nome, email)', { count: 'exact' });

    if (filtros.busca) {
      query = query.ilike('titulo', `%${filtros.busca}%`);
    }

    if (filtros.categoria) {
      query = query.eq('categoria', filtros.categoria);
    }

    if (filtros.status) {
      if (filtros.status === 'publicado') {
        query = query.eq('publicado', true);
      } else if (filtros.status === 'rascunho') {
        query = query.eq('publicado', false);
      }
    }

    if (filtros.autorId) {
      query = query.eq('autor_id', filtros.autorId);
    }

    const from = (filtros.pagina - 1) * filtros.itensPorPagina;
    const to = from + filtros.itensPorPagina - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: filtros.ordem === 'asc' })
      .range(from, to);

    if (error) throw error;
    return { data: data as Noticia[], total: count || 0 };
  },

  async buscarPorId(id: string): Promise<Noticia> {
    const { data, error } = await supabase
      .from('noticias')
      .select('*, autor:profiles(nome, email)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Noticia;
  },

  async verificarSlugUnico(slug: string, idAtual?: string): Promise<boolean> {
    let query = supabase.from('noticias').select('id').eq('slug', slug);
    if (idAtual) {
      query = query.neq('id', idAtual);
    }
    const { data } = await query;
    return !data || data.length === 0;
  },

  async salvar(noticia: Partial<Noticia>): Promise<Noticia> {
    const payload = {
      ...noticia,
      publicado: noticia.status === 'publicado',
      updated_at: new Date().toISOString(),
    };

    if (noticia.id) {
      const { data, error } = await supabase
        .from('noticias')
        .update(payload)
        .eq('id', noticia.id)
        .select()
        .single();
      if (error) throw error;
      return data as Noticia;
    } else {
      const { data, error } = await supabase
        .from('noticias')
        .insert([{ ...payload, created_at: new Date().toISOString() }])
        .select()
        .single();
      if (error) throw error;
      return data as Noticia;
    }
  },

  async excluir(id: string): Promise<void> {
    const { error } = await supabase.from('noticias').delete().eq('id', id);
    if (error) throw error;
  },

  async uploadImagemCapa(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `noticias/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('midia')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('midia').getPublicUrl(filePath);
    return data.publicUrl;
  }
};
