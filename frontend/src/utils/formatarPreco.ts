export default function formatarPreco(preco: number | null, isDoacao: boolean) {
    if (isDoacao) {
        return "Doação"
    }
    if (preco === null) {
        return "Preço a combinar"
    }
    return preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
}