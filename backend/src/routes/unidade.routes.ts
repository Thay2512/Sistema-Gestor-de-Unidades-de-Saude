import { Router } from 'express';
import { UnidadeController } from '../controllers/unidade.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const unidadeController = new UnidadeController();

// router.use(authMiddleware);

router.get('/', unidadeController.getAll);
router.get('/:id', unidadeController.getById);
router.post('/', unidadeController.create);
router.put('/:id', unidadeController.update);
router.delete('/:id', unidadeController.delete);

export default router;
