import { Router } from "express"
import * as anunciosController from "../controllers/anuncios.controller"
import { validate } from "../middlewares/validate"
import { createAnuncioSchema } from "../schemas/anuncio.schema"

const router = Router()

router.post("/", validate(createAnuncioSchema), anunciosController.create)
router.get("/", anunciosController.list)
router.delete("/:id", anunciosController.remove)

export default router