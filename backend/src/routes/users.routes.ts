import {Router} from "express"
import * as usersController from "../controllers/users.controller"
import { validate } from "../middlewares/validate"
import { createUserSchema, loginSchema} from "../schemas/user.schema"
import { authMiddleware } from "../middlewares/auth"

const router = Router()

router.post("/", validate(createUserSchema), usersController.register)
router.post("/login", validate(loginSchema), usersController.login)
router.get("/me", authMiddleware, usersController.me)

export default router