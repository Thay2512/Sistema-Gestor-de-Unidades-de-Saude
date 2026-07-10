import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; email: string }; // ajuste conforme seu payload
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  // Tenta pegar o token do cookie ou do header Authorization
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não definido');
    }
    const decoded = jwt.verify(token, secret) as { id: number; email: string };
    req.user = decoded; // coloca o usuário na requisição
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}
