import { Request, Response } from 'express';
import { UnidadeService } from '../services/unidade.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const unidadeService = new UnidadeService();

export class UnidadeController {
  async create(req: AuthRequest, res: Response) {
    try {
      const { cnes, nome, tipo, turno, endereco, telefone, observacoes, equipes, equipamentos } = req.body;
      
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      // Validação básica
      if (!cnes || !nome || !tipo || !turno || !endereco) {
        return res.status(400).json({ error: 'Campos obrigatórios: cnes, nome, tipo, turno, endereco' });
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
        equipamentos,
        userId, 
      });

      return res.status(201).json(novaUnidade);
    } catch (error: any) {
      console.error('Erro ao criar unidade:', error);
      return res.status(500).json({ error: error.message || 'Erro interno ao criar unidade' });
    }
  }

  async getAll(req: AuthRequest, res: Response) {
    try {
      const unidades = await unidadeService.getAll();
      return res.json(unidades);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const unidade = await unidadeService.getById(id);
      if (!unidade) return res.status(404).json({ error: 'Unidade não encontrada' });
      return res.json(unidade);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const dados = req.body;
      const unidadeAtualizada = await unidadeService.update(id, dados);
      return res.json(unidadeAtualizada);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      await unidadeService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
