import { supabase } from '../lib/supabaseClient';
import { Jogo } from '../types/jogos';

export const jogosService = {
  async listar() {
    const { data, error } = await supabase
      .from('jogos')
      .select('*')
      .order('data_jogo', { ascending: false });
    if (error) throw error;
    return data as Jogo[];
  },

  async salvar(jogo: Partial<Jogo>) {
    if (jogo.id) {
      const { data, error } = await supabase.from('jogos').update(jogo).eq('id', jogo.id).select().single();
      if (error) throw error;
      return data as Jogo;
    } else {
      const { data, error } = await supabase.from('jogos').insert([jogo]).select().single();
      if (error) throw error;
      return data as Jogo;
    }
  },

  async excluir(id: string) {
    const { error } = await supabase.from('jogos').delete().eq('id', id);
    if (error) throw error;
  }
};
