import { Router } from "express"
import { prisma } from "../prisma/client";
import { UnidadeController } from "../controllers/unidade.controller"

const router = Router()
const unidadeController = new UnidadeController()

router.get("/", unidadeController.getAll)
router.post("/", unidadeController.create)
router.get("/:id", unidadeController.getById)
router.put("/:id", unidadeController.update)
router.delete("/:id", unidadeController.delete)

export {router as unidadeRoutes}
