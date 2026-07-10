import { prisma } from "../prisma/client";

const api = "https://apidadosabertos.saude.gov.br/cnes/estabelecimentos/";

export class UnidadeService {
    
    async buscarCnesExterno(cnes: number) {
        const resposta = await fetch(`${api}${cnes}`);
        if (!resposta.ok) {
            throw new Error("Unidade não encontrada na base do DataSUS");
        }
        
        const dadosUbs = await resposta.json();

        return {
            cnes: dadosUbs.codigo_cnes,
            nome: dadosUbs.nome_fantasia,
            tipo: dadosUbs.descricao_esfera_administrativa || "MUNICIPAL", 
            turno: dadosUbs.descricao_turno_atendimento || "Não informado",
            endereco: `${dadosUbs.endereco_estabelecimento}, ${dadosUbs.numero_estabelecimento} - ${dadosUbs.bairro_estabelecimento}`,
            telefone: dadosUbs.numero_telefone_estabelecimento || ""
        };
    }

    async create(dados: { 
        cnes: number; nome: string; tipo: string; turno: string; endereco: string; 
        telefone?: string; observacoes?: string; equipes?: string; equipamentos?: string; userId: number
    }) {
        return await prisma.unidadeSaude.create({
            data: {
                cnes: Number(dados.cnes), 
                nome: dados.nome,
                tipo: dados.tipo,
                turno: dados.turno,
                endereco: dados.endereco,
                telefone: dados.telefone || null,
                observacoes: dados.observacoes || null,
                equipes: dados.equipes || null,
                equipamentos: dados.equipamentos || null,
                userId: dados.userId
            }
        });    
    }

    async findAll() {
        return await prisma.unidadeSaude.findMany();
    }

    async findById(id: number) {
        return await prisma.unidadeSaude.findUnique({ where: { id } });
    }

    async update(id: number, dados: any) {
        if (dados.cnes) dados.cnes = Number(dados.cnes);
        return await prisma.unidadeSaude.update({
            where: { id },
            data: dados
        });
    }

    async delete(id: number) {
        await prisma.unidadeSaude.delete({ where: { id } });
    }
}