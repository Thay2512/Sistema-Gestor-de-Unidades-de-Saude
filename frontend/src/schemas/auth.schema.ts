import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "O campo e-mail é obrigatório").email("Insira um endereço de e-mail válido"),
  senha: z.string().min(4, "A senha deve conter no mínimo 4 dígitos")
});

export const cadastroSchema = z.object({
  nome: z.string().min(1, "O campo usuário é obrigatório"),
  email: z.string().min(1, "O campo e-mail é obrigatório").email("Insira um endereço de e-mail válido"),
  senha: z.string().min(4, "A senha deve conter no mínimo 4 dígitos")
});
