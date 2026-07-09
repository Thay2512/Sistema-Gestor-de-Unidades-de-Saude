import { prisma } from "../prisma/client"

const api = "https://apidadosabertos.saude.gov.br/cnes/estabelecimentos/"

export class UnidadeService {
    async create(dados: { cnes: number }) {
        const novaUnidade = await fetch(api + `${dados.cnes}`)
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

    async findAll() {
        const unidadesItajuba = await fetch(api + `?co_municipio=313240`)
        const resultado = await unidadesItajuba.json()
        return resultado.content
    }

    async findById(id: number) {
        const unidade = await prisma.unidadeSaude.findUnique({
            where: { id }
        })
        return unidade
    }

    async delete(id: number) {
        await prisma.unidadeSaude.delete({
            where: { id }
        })
    }

    async update(id: number, dados: { cnes: number }) {
        const novaUnidade = await fetch(api + `?nu_cnes=${dados.cnes}`)
        const resultado = await novaUnidade.json()

        const unidadeEncontrada = resultado.content.find(
            (item: any) => Number(item.nu_cnes) === dados.cnes
        )

        await prisma.unidadeSaude.update({
            where: { id },
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
