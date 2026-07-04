import { Request, Response } from "express"
import { UnidadeService } from "../services/unidade.service" // Ajuste o caminho se necessário

const unidadeService = new UnidadeService()

export class UnidadeController {

    async create(req: Request, res: Response) {
        const dados = req.body
        dados.cnes = Number(dados.cnes)
        
        await unidadeService.create(dados)
        res.status(200).send()
    }

    async getAll(req: Request, res: Response) {
        const unidades = await unidadeService.findAll()
        res.status(200).send(unidades)
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        const unidade = await unidadeService.findById(Number(id))
        res.status(200).send(unidade)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const dados = req.body
        dados.cnes = Number(dados.cnes)

        await unidadeService.update(Number(id), dados)
        res.status(200).send()
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        await unidadeService.delete(Number(id))
        res.status(200).send()
    }
}