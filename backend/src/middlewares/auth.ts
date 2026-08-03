import  {Request, Response, NextFunction} from "express"
import { verificarToken } from "../utils/jwt"

export interface AuthRequest extends Request {
    userId?: string
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization
    if(!header) return res.status(401).json({error: "Token não fornecido"})
    
    const [, token] = header.split(" ")
    if(!token) return res.status(401).json({error: "Formato do token inválido"})

    try {
        const {userId} = verificarToken(token)
        req.userId = userId
        next()
    } catch (err) {
        return res.status(401).json({error: "Token inválido ou expirado"})
    }
}