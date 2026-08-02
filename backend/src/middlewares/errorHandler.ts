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
    console.error(err)
    res.status(500).json({ error: "Erro interno no servidor" })
}
