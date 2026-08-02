import { Request, Response, NextFunction } from "express"
import { ZodType } from "zod"

export function validate(Schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = Schema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ error: result.error.flatten() })
        } 
        req.body = result.data
        next()
    }
}
