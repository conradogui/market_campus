// prisma/seed.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.anuncio.deleteMany()

  await prisma.anuncio.createMany({
    data: [
      {
        titulo: "Cálculo Vol. 1 - James Stewart",
        descricao: "Edição usada, poucas marcações, ótimo estado.",
        categoria: "Livros",
        preco: 45.0,
        isDoacao: false,
        userId: "seed-user-1",
      },
      {
        titulo: "Calculadora Científica HP 12C",
        descricao: "Funcionando perfeitamente, uso em Engenharia Econômica.",
        categoria: "Engenharia",
        preco: 80.0,
        isDoacao: false,
        userId: "seed-user-1",
      },
      {
        titulo: "Jaleco tamanho M",
        descricao: "Doação para quem está começando o curso.",
        categoria: "Saúde",
        isDoacao: true,
        userId: "seed-user-2",
      },
      {
    titulo: "Cálculo Vol. 1 - James Stewart",
    descricao: "Produto tal, usado, bom estado",
    categoria: "Livros",
    preco: 45,
    isDoacao: false,
    userId: "seed-user-1",
  },
  {
    titulo: "Notebook Dell Inspiron i5",
    descricao: "Notebook usado, 8GB RAM, SSD 256GB, funcionando perfeitamente.",
    categoria: "Eletrônicos",
    preco: 2200,
    isDoacao: false,
    userId: "seed-user-2",
  },
  {
    titulo: "Mesa de Escritório",
    descricao: "Mesa de madeira em ótimo estado, ideal para home office.",
    categoria: "Móveis",
    preco: 350,
    isDoacao: false,
    userId: "seed-user-3",
  },
  {
    titulo: "Monitor LG 24 Polegadas",
    descricao: "Monitor Full HD com entrada HDMI e VGA.",
    categoria: "Eletrônicos",
    preco: 650,
    isDoacao: false,
    userId: "seed-user-4",
  },
  {
    titulo: "Bicicleta Aro 29",
    descricao: "Bicicleta seminova com 21 marchas.",
    categoria: "Esportes",
    preco: 1200,
    isDoacao: false,
    userId: "seed-user-5",
  },
  {
    titulo: "Cadeira Gamer",
    descricao: "Cadeira ergonômica com apoio para lombar e pescoço.",
    categoria: "Móveis",
    preco: 850,
    isDoacao: false,
    userId: "seed-user-2",
  },
  {
    titulo: "Livro Clean Code",
    descricao: "Livro em excelente estado de conservação.",
    categoria: "Livros",
    preco: 70,
    isDoacao: false,
    userId: "seed-user-1",
  },
  {
    titulo: "Violão Acústico Giannini",
    descricao: "Violão com cordas novas, acompanha capa.",
    categoria: "Instrumentos Musicais",
    preco: 500,
    isDoacao: false,
    userId: "seed-user-3",
  },
  {
    titulo: "Roupas Infantis",
    descricao: "Lote de roupas infantis para crianças de 2 a 4 anos.",
    categoria: "Roupas",
    preco: 0,
    isDoacao: true,
    userId: "seed-user-4",
  },
  {
    titulo: "Sofá 3 Lugares",
    descricao: "Sofá confortável, tecido cinza, pouco tempo de uso.",
    categoria: "Móveis",
    preco: 900,
    isDoacao: false,
    userId: "seed-user-5",
  },
  {
    titulo: "Kit de Panelas Inox",
    descricao: "Conjunto com 5 panelas em ótimo estado.",
    categoria: "Casa e Cozinha",
    preco: 250,
    isDoacao: false,
    userId: "seed-user-2",
  }
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    throw new Error(e)

  })
  .finally(() => prisma.$disconnect())