import { UnidadeService } from "../services/unidade.service";
import { Request, Response } from "express";

const unidadeService = new UnidadeService()

export class UnidadeController{

    async create(req: Request, res: Response){
        const dados = req.body
        await unidadeService.create(dados)
        res.status(200).send()
    }

    async getAll(req: Request, res: Response){
        const unidades = await unidadeService.getAll()
        res.status(200).send(unidades)
    }

    async getById(req: Request, res: Response){
        const { id } = req.params
        const unidade = await unidadeService.getById(id)
        res.status(200).send(unidade)
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const dados = req.body
        await unidadeService.update(id, dados)
        res.status(200).send()
    }

    async delete(req: Request, res: Response){
        const { id } = req.params
        await unidadeService.delete(id)
        res.status(200).send()
    }

}