import { Request, Response, NextFunction } from "express"
import * as anunciosService from "../services/anuncios.service"
import { AuthRequest } from "../middlewares/auth"

export async function create(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const anuncio = await anunciosService.criarAnuncio(req.body, req.userId!)
    res.status(201).json(anuncio)
  } catch (err) {
    next(err)
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoria, userId } = req.query
    const anuncios = await anunciosService.listarAnuncios({
      categoria: categoria as string | undefined,
      userId: userId as string | undefined,
    })
    res.json(anuncios)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await anunciosService.deletarAnuncio(req.params.id as string, req.userId!)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}