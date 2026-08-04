import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Link, useNavigate } from "react-router"
import type { FormEvent } from "react"

const API_URL = import.meta.env.VITE_API_URL

interface LoginSuccessResponse {
  user: unknown
  token: string
}

// interface LoginErrorResponse { -> a API deve responder com um objeto com error, logo ñ precisa ser definida aqui (ERRO DA IA)
//   error: string
// }

interface LoginCredentialsErrorResponse {
  error: string
}

interface LoginValidationErrorResponse {
  error: {
    fieldErrors: {
      email?: string[]
      senha?: string[]
    }
  }
}

type LoginErrorResponse =
  | LoginCredentialsErrorResponse
  | LoginValidationErrorResponse

type FieldErrors = {
  email?: string[]
  senha?: string[]
}

function isValidationError(
  data: LoginErrorResponse,
): data is LoginValidationErrorResponse {
  return typeof data.error === "object" && data.error !== null
}


function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })

      if (!response.ok) {
        const data: LoginErrorResponse = await response.json()
        if (isValidationError(data)) {
          setFieldErrors(data.error.fieldErrors)
          setError("Corrija os camps abaixo")
        } else {
        setError(data.error ?? "Não foi possível fazer login")
        }
        return
      }

      const data: LoginSuccessResponse = await response.json()
      login(data.token)
      navigate("/")
    } catch {
      setError("Não foi possível conectar ao servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Página de Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="voce@exemplo.com"
            />
            {fieldErrors.email?.map((message) => (
              <p key={message} className="text-sm text-red-600">
                {message}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {fieldErrors.senha?.map((message) => (
              <p key={message} className="text-sm text-red-600">
                {message}
              </p>
            ))}
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600"> Ainda não tem conta? <Link to="/register" className="font-medium text-blue-600 hover:underline">Cadastre-se</Link></p>
      </div>
    </div>
  )
}

export default Login
