export interface Jogador {
  id: string;
  nome: string;
  numero?: number | null;
  posicao: string;
  foto?: string | null;
  data_nascimento?: string | null;
  nacionalidade?: string | null;
  altura?: number | null;
  peso?: number | null;
  descricao?: string | null;
  ativo: boolean;
}
