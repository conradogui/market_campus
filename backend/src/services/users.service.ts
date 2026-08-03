import bcrypt from "bcryptjs"
import { prisma } from "../db/prisma"
import { gerarToken } from "../utils/jwt"

export async function criarUsuario(data: {nome: string; email: string; senha: string}) {
    const senhaHash = await bcrypt.hash(data.senha, 10)

    const user = await prisma.user.create({
        data: { nome: data.nome, email: data.email, senha: senhaHash }
    })
    const {senha, ...userSemSenha} = user
    return userSemSenha
}

export async function autenticar(email: string, senha: string) {
    const user = await prisma.user.findUnique({where: {email}})
    if(!user) throw new Error("Credenciais de usuário invalidas")

    const senhaCorreta = await bcrypt.compare(senha, user.senha)
    if(!senhaCorreta) throw new Error("Credenciais de usuário invalidas")

    const token = gerarToken(user.id)
    const {senha: _, ...userSemSenha} = user
    return {user: userSemSenha, token}
}
