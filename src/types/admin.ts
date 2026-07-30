export type AdminTab = 
  | 'dashboard' 
  | 'noticias' 
  | 'jogos' 
  | 'jogadores' 
  | 'produtos' 
  | 'rifas' 
  | 'galeria' 
  | 'documentos' 
  | 'patrocinadores' 
  | 'usuarios' 
  | 'configuracoes';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}
