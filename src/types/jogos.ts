export type MatchStatus = 'agendado' | 'ao_vivo' | 'finalizado' | 'cancelado';

export interface Jogo {
  id: string;
  adversario: string;
  campeonato: string;
  data_jogo: string;
  horario: string;
  local: string;
  escudo_adversario?: string | null;
  placar_garimpo?: number | null;
  placar_adversario?: number | null;
  status: MatchStatus;
  created_at: string;
}
