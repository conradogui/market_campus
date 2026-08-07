import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth"

function Header() {
    const {isAuthenticated, logout} = useAuth()

    return (
        <header className="bg-blue-700 px-4 py-4 text-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between">
                <Link to="/" className="font-notch text-xl font-bold">
                    Market <span className="underline">Campus</span>
                </Link>
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
        </header>
    )
}

export default Header
