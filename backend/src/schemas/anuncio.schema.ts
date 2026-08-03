import {z} from "zod"

export const createAnuncioSchema = z.object({
  titulo: z.string().min(3, "Título muito curto"),
  descricao: z.string().min(10, "Descrição muito curta"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  preco: z.number().positive().optional(),
  isDoacao: z.boolean().default(false),
  imagemUrl: z.string().url().optional(),
})

export type CreateAnuncioInput = z.infer<typeof createAnuncioSchema>