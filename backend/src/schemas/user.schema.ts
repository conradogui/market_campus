import z from "zod";

export const createUserSchema = z.object({
    nome: z.string().min(2, "Nome é muito curto"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
})

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(1, "Senha é obrigatória"),
})