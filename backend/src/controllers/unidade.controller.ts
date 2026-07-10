import { Request, Response } from "express";
import { UnidadeService } from "../services/unidade.service";

const unidadeService = new UnidadeService();

export class UnidadeController {
    
    async getAll(req: Request, res: Response) {
        try {
            const unidades = await unidadeService.findAll();
            return res.status(200).json(unidades);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar unidades" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { cnes, nome, tipo, turno, endereco, telefone, observacoes, equipes, equipamentos } = req.body;

            if (!cnes || !nome || !tipo || !turno || !endereco) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes" });
            }

            const novaUnidade = await unidadeService.create({
                cnes: Number(cnes),
                nome,
                tipo,
                turno,
                endereco,
                telefone,
                observacoes,
                equipes,
                equipamentos
            });

            return res.status(201).json(novaUnidade);
        } catch (error: any) {
            return res.status(500).json({ error: error.message || "Erro ao criar unidade" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const unidade = await unidadeService.findById(id);
            if (!unidade) return res.status(404).json({ error: "Unidade não encontrada" });

            return res.status(200).json(unidade);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar unidade" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const unidadeAtualizada = await unidadeService.update(id, req.body);
            return res.status(200).json(unidadeAtualizada);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar unidade" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            await unidadeService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar unidade" });
        }
    }
}