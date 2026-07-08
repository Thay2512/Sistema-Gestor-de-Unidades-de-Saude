import { UnidadeSaude } from "@/tipos/unidade";

const API_URL = "http://localhost:3001"; 

export const unidadeService = {
  getAll: async (): Promise<UnidadeSaude[]> => {
    const response = await fetch(`${API_URL}/unidades`, {
      cache: "no-store", 
    });
    
    if (!response.ok) {
      throw new Error("Erro ao buscar unidades de saúde");
    }
    
    return response.json();
  }
};