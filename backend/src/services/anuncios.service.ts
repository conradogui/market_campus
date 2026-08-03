import { prisma } from "../db/prisma"
import { CreateAnuncioInput } from "../schemas/anuncio.schema"

export async function criarAnuncio(data: CreateAnuncioInput, userId: string) {
    return prisma.anuncio.create({data: {...data, userId}})
}

export async function listarAnuncios(filtros: { categoria?: string; userId?: string}) {
    return prisma.anuncio.findMany({
        where: {
            categoria: filtros.categoria || undefined,
            userId: filtros.userId || undefined
        },
        orderBy: { createdAt: "desc" }
    })
}

// anuncios.service.ts
export async function deletarAnuncio(id: string, userId: string) {
    const resultado = await prisma.anuncio.deleteMany({where: {id, userId}})
    if(resultado.count === 0) {
        throw new Error("Anuncio não encontrado")
    }
}