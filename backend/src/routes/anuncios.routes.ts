import { Router } from "express"
import * as anunciosController from "../controllers/anuncios.controller"
import { validate } from "../middlewares/validate"
import { createAnuncioSchema } from "../schemas/anuncio.schema"
import { authMiddleware } from "../middlewares/auth"

const router = Router()

router.post("/", authMiddleware, validate(createAnuncioSchema), anunciosController.create)
router.get("/", anunciosController.list)
router.delete("/:id", authMiddleware, anunciosController.remove)

export default router