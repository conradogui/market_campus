// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  await prisma.anuncio.deleteMany()
  await prisma.user.deleteMany()

  const senhaHash = await bcrypt.hash("123456", 10)

  const [u1, u2, u3, u4, u5] = await Promise.all([
    prisma.user.create({ data: { nome: "Usuário Seed 1", email: "seed1@unifor.br", senha: senhaHash } }),
    prisma.user.create({ data: { nome: "Usuário Seed 2", email: "seed2@unifor.br", senha: senhaHash } }),
    prisma.user.create({ data: { nome: "Usuário Seed 3", email: "seed3@unifor.br", senha: senhaHash } }),
    prisma.user.create({ data: { nome: "Usuário Seed 4", email: "seed4@unifor.br", senha: senhaHash } }),
    prisma.user.create({ data: { nome: "Usuário Seed 5", email: "seed5@unifor.br", senha: senhaHash } }),
  ])

  await prisma.anuncio.createMany({
    data: [
      {
        titulo: "Cálculo Vol. 1 - James Stewart",
        descricao: "Edição usada, poucas marcações, ótimo estado.",
        categoria: "Livros",
        preco: 45.0,
        isDoacao: false,
        userId: u1.id,
      },
      {
        titulo: "Calculadora Científica HP 12C",
        descricao: "Funcionando perfeitamente, uso em Engenharia Econômica.",
        categoria: "Engenharia",
        preco: 80.0,
        isDoacao: false,
        userId: u1.id,
      },
      {
        titulo: "Jaleco tamanho M",
        descricao: "Doação para quem está começando o curso.",
        categoria: "Saúde",
        isDoacao: true,
        userId: u2.id,
      },
  {
    titulo: "Notebook Dell Inspiron i5",
    descricao: "Notebook usado, 8GB RAM, SSD 256GB, funcionando perfeitamente.",
    categoria: "Eletrônicos",
    preco: 2200,
    isDoacao: false,
    userId: u2.id,
  },
  {
    titulo: "Mesa de Escritório",
    descricao: "Mesa de madeira em ótimo estado, ideal para home office.",
    categoria: "Móveis",
    preco: 350,
    isDoacao: false,
    userId: u3.id,
  },
  {
    titulo: "Monitor LG 24 Polegadas",
    descricao: "Monitor Full HD com entrada HDMI e VGA.",
    categoria: "Eletrônicos",
    preco: 650,
    isDoacao: false,
    userId: u4.id,
  },
  {
    titulo: "Bicicleta Aro 29",
    descricao: "Bicicleta seminova com 21 marchas.",
    categoria: "Esportes",
    preco: 1200,
    isDoacao: false,
    userId: u5.id,
  },
  {
    titulo: "Cadeira Gamer",
    descricao: "Cadeira ergonômica com apoio para lombar e pescoço.",
    categoria: "Móveis",
    preco: 850,
    isDoacao: false,
    userId: u2.id,
  },
  {
    titulo: "Livro Clean Code",
    descricao: "Livro em excelente estado de conservação.",
    categoria: "Livros",
    preco: 70,
    isDoacao: false,
    userId: u3.id,
  },
  {
    titulo: "Violão Acústico Giannini",
    descricao: "Violão com cordas novas, acompanha capa.",
    categoria: "Instrumentos Musicais",
    preco: 500,
    isDoacao: false,
    userId: u3.id,
  },
  {
    titulo: "Roupas Infantis",
    descricao: "Lote de roupas infantis para crianças de 2 a 4 anos.",
    categoria: "Roupas",
    preco: 0,
    isDoacao: true,
    userId: u4.id,
  },
  {
    titulo: "Sofá 3 Lugares",
    descricao: "Sofá confortável, tecido cinza, pouco tempo de uso.",
    categoria: "Móveis",
    preco: 900,
    isDoacao: false,
    userId: u5.id,
  },
  {
    titulo: "Kit de Panelas Inox",
    descricao: "Conjunto com 5 panelas em ótimo estado.",
    categoria: "Casa e Cozinha",
    preco: 250,
    isDoacao: false,
    userId: u2.id,
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