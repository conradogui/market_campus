import { useEffect, useState } from "react"
import { fetchDaApi } from "../services/api"
import type { Anuncio } from "../types/anuncio"
import AnuncioCard from "../components/AnuncioCard"

function MeusAnuncios() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadMeusAnuncios() {
            try {
                const data = await fetchDaApi("/anuncios/meus")
                setAnuncios(data)
            } catch {
                setError("Não foi possível carregar seus anúncios")
            } finally {
                setLoading(false)
            }
        }

        loadMeusAnuncios()
    }, [])


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">Meus Anúncios</h1>
                {loading && <p className="text-gray-500">Carregando...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!loading && !error && anuncios.length === 0 && (
                <p className="text-gray-500">Você ainda não cadastrou nenhum anúncio.</p>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {anuncios.map((anuncio) => (
                    <AnuncioCard key={anuncio.id} anuncio={anuncio} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default MeusAnuncios
