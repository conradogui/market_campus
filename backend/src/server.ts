import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import anunciosRouter from "./routes/anuncios.routes"
import { errorHandler } from "./middlewares/errorHandler"
import usersRouter from "./routes/users.routes"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/anuncios", anunciosRouter)
app.use("/users", usersRouter)

app.get("/working", (_req, res) => {
  res.json({ status: "projeto funcionando" })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

app.use(errorHandler)