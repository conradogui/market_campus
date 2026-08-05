export interface Anuncio {
  id: string
  titulo: string
  descricao: string
  categoria: string
  preco: number | null
  isDoacao: boolean
  imagemUrl: string | null
  userId: string
  createdAt: string
}