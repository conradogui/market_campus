import type { Anuncio } from "../types/anuncio"

import formatarPreco from "../utils/formatarPreco"

interface AnuncioCardProps {
  anuncio: Anuncio
  onDelete?: () => void
}

function AnuncioCard({ anuncio, onDelete }: AnuncioCardProps) { 
    return (
        <div className="flex flex-col overflow-hidden rounded-sm shadow-sm hover:shadow-lg">
          <div className="flex h-40 items-center justify-center bg-gray-100">
            {anuncio.imagemUrl ? (
              <img src={anuncio.imagemUrl} alt={anuncio.titulo} className="h-full w-full object-cover"/>
            ) : (
              <span className="text-sm text-gray-400">Sem imagem</span>
            )}
          </div>
          <div className="flex gap-2 flex-col p-6">
            <h3 className="font-semibold text-gray-900">{anuncio.titulo}</h3>
            <p className="line-clamp-2 text-sm text-gray-600">{anuncio.descricao}</p>
            <span className="mt-auto text-lg font-bold text-gray-900">
              {formatarPreco(anuncio.preco, anuncio.isDoacao)}
            </span>
            <span className="w-fit bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {anuncio.categoria}
            </span>
            {onDelete && (
              <button onClick={onDelete} className="mt-auto text-sm text-red-600 border border-red-600 rounded-md px-2 py-1 cursor-pointer">Excluir</button>
            )}
          </div>
    </div>
    )
}

export default AnuncioCard
