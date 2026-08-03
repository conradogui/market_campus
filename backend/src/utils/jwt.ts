import jwt  from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET! as string

export function gerarToken(userId: string) {
    return jwt.sign({ userId }, SECRET, { expiresIn: "1d" })
}

export function verificarToken(token: string): {userId: string} {
    return jwt.verify(token, SECRET) as {userId: string}
}