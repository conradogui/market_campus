import { Request, Response, NextFunction } from "express"
import * as usersService from "../services/users.service"
import { AuthRequest } from "../middlewares/auth"

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await usersService.criarUsuario(req.body)
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, senha} = req.body
        const {user, token} = await usersService.autenticar(email, senha)
        res.json({user, token})
    } catch (err) {
        next(err)
    }
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        res.json({userId: req.userId})

    }catch (err) {
        next(err)
    }
}