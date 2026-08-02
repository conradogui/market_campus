import { prisma } from "../db/prisma"
import { CreateAnuncioInput } from "../schemas/anuncio.schema"

export async function criarAnuncio(data: CreateAnuncioInput) {
    return prisma.anuncio.create({data})
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

export async function deletarAnuncio(id: string) {
    return prisma.anuncio.delete({where: {id}})
}