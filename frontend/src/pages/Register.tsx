import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router"

const API_URL = import.meta.env.VITE_API_URL

interface RegisterSuccessResponse {
  id: string
  nome: string
  email: string
  createdAt: string
}

interface RegisterDuplicateErrorResponse {
  error: string
}

interface RegisterValidationErrorResponse {
  error: {
    fieldErrors: {
      nome?: string[]
      email?: string[]
      senha?: string[]
    }
  }
}

type RegisterErrorResponse =
  | RegisterDuplicateErrorResponse
  | RegisterValidationErrorResponse

type FieldErrors = {
  nome?: string[]
  email?: string[]
  senha?: string[]
}

function isValidationError(
  data: RegisterErrorResponse,
): data is RegisterValidationErrorResponse {
  return typeof data.error === "object" && data.error !== null
}

function Register() {
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      })

      if (!response.ok) {
        const data: RegisterErrorResponse = await response.json()

        if (isValidationError(data)) {
          setFieldErrors(data.error.fieldErrors)
          setError("Corrija os campos destacados abaixo")
        } else {
          setError(data.error ?? "Não foi possível cadastrar")
        }
        return
      }

      await response.json() as RegisterSuccessResponse
      navigate("/login")
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
          Página de Cadastro
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Seu nome completo"
            />
            {fieldErrors.nome?.map((message) => (
              <p key={message} className="text-sm text-red-600">
                {message}
              </p>
            ))}
          </div>

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
              minLength={6}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Mínimo de 6 caracteres"
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
