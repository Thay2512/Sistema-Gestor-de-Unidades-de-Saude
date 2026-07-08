export interface UnidadeSaude {
  id: number;
  cnes: number;
  nome: string;
  tipo: string;
  turno: string;
  endereco: string;
  telefone?: string | null;
  observacoes?: string | null;
  equipes?: string | null;
  equipamentos?: string | null;
  createdAt: string;
}