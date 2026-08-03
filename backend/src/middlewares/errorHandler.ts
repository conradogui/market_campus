import { Request, Response, NextFunction } from "express"
import { Prisma } from "@prisma/client"

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") { //codigo de registro inexistente, logo, não da erro se não tiver nada
        return res.status(404).json({ error: "Anuncio não encontrado" })
    }
    if(err.message === "Credenciais de usuário invalidas") {//evita cair no erro 500 genericamente
        return res.status(401).json({ error: err.message })
    }
    if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {//codigo de registro duplicado
        return res.status(409).json({ error: "E-mail já cadastrado" })
    }

    console.error(err)
    res.status(500).json({ error: "Erro interno no servidor" })
}
