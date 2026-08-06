import { Link } from "react-router"
import { useEffect, useState } from "react"
import { fetchDaApi } from "../services/api"
import type { Anuncio } from "../types/anuncio"
import AnuncioCard from "../components/AnuncioCard"
import { useAuth } from "../hooks/useAuth"

function Home() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { isAuthenticated, logout } = useAuth()

    useEffect(() => {
        async function carregaeAnuncios() {
            try {
                const data = await fetchDaApi("/anuncios")
                setAnuncios(data)
            } catch {
                setError(`Erro ao carregar os anuncios`)
            } finally {
                setLoading(false)
            }
        }

        carregaeAnuncios()
    }, [])
    
    const categorias = ["todos", ...new Set(anuncios.map((item) => item.categoria))]
    const anunciosFiltrados = categoriaSelecionada === "todos" ? anuncios : anuncios.filter((item) => item.categoria === categoriaSelecionada)
    const totalAnuncios = anuncios.length
    const totalDoacoes= anuncios.filter((item) => item.isDoacao).length

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 px-4 py-16 text-center text-white">
        <nav className="mx-auto mb-12 flex max-w-6xl items-center justify-between">
          <span className="font-notch text-3xl font-bold sm:text-4xl">Market <span className="underline">Campus</span></span>
          <div className="flex flex-wrap gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/meus" className="rounded-sm border border-white px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                  Meus Anúncios
                </Link>
                <button onClick={logout} className="rounded-sm border border-white px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                  Sair
                </button>
              </>
              ) : (
                <>
                  <Link to="/login" className="rounded-sm border border-white px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
                    Login
                  </Link>
                  <Link to="/register" className="rounded-sm bg-white px-4 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50">
                    Cadastre-se
                  </Link>
                </>
              )}
              <Link to="/anunciar" className="rounded-sm bg-white px-4 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50">
                  Anuncie aqui
              </Link>
          </div>
        </nav>
        <p className="mx-auto mt-4 max-w-xl text-white">
          O marketplace de economia circular do campus - doe, venda e encontre o que você precisa.
        </p>
      </section>
      <section className="mx-auto grid max-w-4xl grid-cols-2 gap-15 py-8">
        <div className="rounded-sm p-6 text-center border border-blue-700 bg-white">
          <span className="block text-3xl font-bold text-blue-700">
            {totalAnuncios}
          </span>
          <span>Itens anunciados</span>
        </div>
        <div className="rounded-sm p-6 text-center border border-blue-700 bg-white">
          <span className="block text-3xl font-bold text-blue-700">
            {totalDoacoes}
          </span>
          <span>Itens em doação</span>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Últimos anúncios
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button key={cat} onClick={() => setCategoriaSelecionada(cat)} className={`rounded-sm px-4 py-1.5 text-sm font-medium transition-colors ${
                categoriaSelecionada === cat ? "bg-blue-700 text-white" : "bg-white text-blue-700 hover:bg-blue-500 hover:text-white"
              }`}>
              {cat}
            </button>
          ))}
        </div>
        {loading && <p className="text-gray-500">Carregando...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && anunciosFiltrados.length === 0 && (
          <p className="text-gray-500">Nenhum anúncio encontrado nessa categoria.</p>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {anunciosFiltrados.map((anuncio) => (
            <AnuncioCard key={anuncio.id} anuncio={anuncio} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home