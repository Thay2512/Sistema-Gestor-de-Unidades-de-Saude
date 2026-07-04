import prisma from "../prisma/client"

const api = "https://apidadosabertos.saude.gov.br/assistencia-a-saude/unidade-basicas-de-saude"

export class UnidadeService {
    async create(dados: { cnes: number }) {
        const novaUnidade = await fetch(api + `?nu_cnes=${dados.cnes}`)
        
        const resultado = await novaUnidade.json()

        const unidadeEncontrada = resultado.content.find(
            (item: any) => Number(item.nu_cnes) === dados.cnes
        )

        await prisma.unidadeSaude.create({
            data: {
                cnes: dados.cnes,
                nome: unidadeEncontrada.no_fantasia,
                tipo: unidadeEncontrada.ds_tipo_unidade,
                turno: unidadeEncontrada.ds_turno_atendimento,
                endereco: unidadeEncontrada.nu_endereco || "Endereço não informado",
            }
        })    
    }
}