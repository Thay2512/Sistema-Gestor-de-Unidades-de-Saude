import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret-key-unifei";

export function autenticarToken(req: Request, res: Response, next: NextFunction): any {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Acesso negado." });
  }

  try {
    const verificado = jwt.verify(token, JWT_SECRET);
    (req as any).usuario = verificado;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido." });
  }
}