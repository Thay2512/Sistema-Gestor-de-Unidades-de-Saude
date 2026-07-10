import { Router } from "express";
import { UnidadeController } from "../controllers/unidade.controller";
import { UnidadeService } from "../services/unidade.service";
import { prisma } from "../prisma/client";

const router = Router();
const unidadeController = new UnidadeController();
const unidadeService = new UnidadeService();

router.get("/", unidadeController.getAll);
router.post("/", unidadeController.create);

router.get("/consulta-cnes/:cnes", async (req, res) => {
    const { cnes } = req.params;
    try {
        const dadosUbs = await unidadeService.buscarCnesExterno(Number(cnes));
        return res.status(200).json(dadosUbs);
    } catch (error: any) {
        return res.status(404).json({ error: error.message });
    }
});

router.get("/search", async (req, res) => {
    const { cnes } = req.query;
    if (!cnes) {
        return res.status(400).send({ error: "Parâmetro 'cnes' é obrigatório" });
    }

    try {
        const unidade = await prisma.unidadeSaude.findUnique({
            where: { cnes: Number(cnes) } 
        });

        if (!unidade) {
            return res.status(404).send({ error: "Unidade não encontrada localmente" });
        }

        res.status(200).send(unidade);
    } catch (error) {
        res.status(500).send({ error: "Erro ao buscar unidade" });
    }
});

router.get("/:id", unidadeController.getById);
router.put("/:id", unidadeController.update);
router.delete("/:id", unidadeController.delete);

export { router as unidadeRoutes };