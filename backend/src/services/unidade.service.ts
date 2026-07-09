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
            endereco: `${dadosUbs.endereco_estabelecimento}, Bairro: ${dadosUbs.bairro_estabelecimento}`,
            turno: dadosUbs.descricao_turno_atendimento,
            telefone: dadosUbs.numero_telefone_estabelecimento || ""
        };
    }

    async create(dados: { cnes: string; nome: string; turno: string; endereco: string; telefone?: string }) {
        return await prisma.unidadeSaude.create({
            data: {
                cnes: String(dados.cnes),
                nome: dados.nome,
                turno: dados.turno,
                endereco: dados.endereco,
                telefone: dados.telefone || null
            }
        });    
    }

    async findAll() {
        return await prisma.unidadeSaude.findMany();
    }

    async findById(id: number) {
        return await prisma.unidadeSaude.findUnique({
            where: { id }
        });
    }

    async update(id: number, dados: { cnes: string; nome: string; turno: string; endereco: string; telefone?: string }) {
        return await prisma.unidadeSaude.update({
            where: { id },
            data: dados
        });
    }

    async delete(id: number) {
        await prisma.unidadeSaude.delete({
            where: { id }
        });
    }
}
