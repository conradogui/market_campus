import { Request, Response, NextFunction } from "express"
import * as anunciosService from "../services/anuncios.service"

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const anuncio = await anunciosService.criarAnuncio(req.body)
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

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await anunciosService.deletarAnuncio(req.params.id as string)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}