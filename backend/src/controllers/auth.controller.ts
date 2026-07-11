import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController{

    async create(req: Request, res: Response) {
    try {
        const { usuario, email, senha } = req.body;
        const user = await authService.create(usuario, email, senha); // <-- aqui
        res.json(user);
    } catch (error) {
        res.status(400).json({
        message: error instanceof Error ? error.message : "Erro",
        });
    }
    }


    async login(req: Request,res: Response)
    {
        try {
            const {email, senha} = req.body;

            const resposta = await authService.login(email,senha);

            res.cookie("token", resposta.token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                }
            )
            res.json({
                success: true,
            });

        } catch (error)
        {
            res.status(400).json({
                message: 
                   error instanceof Error
                   ? error.message
                   : "Erro",
            });
        }
    }

    async logout(req: Request,res: Response)
    {
        res.clearCookie("token");

        res.json({
            success: true,
        });
    }

}