const API_URL = import.meta.env.VITE_API_URL

export async function fetchDaApi(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token")

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    })
    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro na requisição")
    }
    if (response.status === 204) {
        return null
    }
    return response.json()
}
