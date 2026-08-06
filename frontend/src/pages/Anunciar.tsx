import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router"
import { fetchDaApi } from "../services/api"

function Anunciar() {

    const navigate = useNavigate()
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [categoria, setCategoria] = useState("")
    const [isDoacao, setIsDoacao] = useState(false)
    const [preco, setPreco] = useState("")
    const [imagemUrl, setImagemUrl] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await fetchDaApi("/anuncios", {
                method: "POST",
                body: JSON.stringify({
                    titulo,
                    descricao,
                    categoria,
                    isDoacao,
                    preco: isDoacao ? undefined : Number(preco),
                    imagemUrl: imagemUrl || undefined,
                }),
            })
            navigate("/")
        } catch {   
            setError("Não foi possivel criar o anúncio")
        } finally {
            setLoading(false)
        }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-sm bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center font-notch text-2xl font-bold text-gray-900 sm:text-3xl">
          Anunciar item
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="titulo" className="text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                id="titulo"
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Cadeira de escritório"
                className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                required
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Conte um pouco mais sobre o item: estado de conservação, detalhes, etc."
                className="resize-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                Categoria
              </label>
              <input
                id="categoria"
                type="text"
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ex: Livros, Eletrônicos, Móveis..."
                className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={isDoacao} onChange={(e) => setIsDoacao(e.target.checked)} className="h-4 w-4 rounded border-gray-300 accent-blue-700"/>
              É uma doação
            </label>
            {isDoacao ? (
              <p className="text-sm text-gray-500">
                Este item será anunciado como doação, sem preço.
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                <label htmlFor="preco" className="text-sm font-medium text-gray-700">
                  Preço (R$)
                </label>
                <input
                  id="preco"
                  type="number"
                  min="0"
                  step="0.01"
                  required={!isDoacao}
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="0,00"
                  className="rounded-sm border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="imagemUrl" className="text-sm font-medium text-gray-700">
              URL da imagem (opcional)
            </label>
            <input
              id="imagemUrl"
              type="url"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="https://..."
              className="rounded-sm border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          <button type="submit" disabled={loading} className="rounded-sm bg-blue-700 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300">
            {loading ? "Publicando..." : "Publicar anúncio"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Anunciar