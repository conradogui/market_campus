# market_campus

- Marketplace para alunos do ambiente universitário da Unifor. Permite que estudantes cadastrem itens para doação ou venda, facilitando acesso a materiais para ingressantes na universidade e a economia circualr no campus.
- Deploy do projeto (frontend): https://market-campus-5x6g-c4h8tao8l-conradoguis-projects.vercel.app
- Deploy do projeto (backend): https://market-campus.onrender.com



## Tecnologias utilizadas

**Backend**
- Node.js + TypeScript
- Express
- Prisma ORM + PostgreSQL
- JWT + bcryptjs
- Zod

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v8

## Como rodar o projeto localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado e rodando localmente (ou uma instância na nuvem, ex: Neon/Supabase)

### Backend

```bash
cd backend
npm install
```
- crie um arquivo .env na pasta /backend com:

```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/market_campus
JWT_SECRET=uma_string_secreta_aleatoria
PORT=3333
```
- Depois execute o backend com:
```bash
npx prisma migrate dev
npx prisma db seed   # stack opcional (apenas para popular o banco)
npm run dev
```
### Frontend

```bash
cd frontend
npm install
```
- Crie um arquivo .env na pasta /frontend com:
```bash
VITE_API_URL=http://localhost:3333
```
- Depois execute o frontend com:
```bash
npm run dev
```
# Diário de bordo da IA
## Ferramentas utilizadas
### Chat GPT
- Usado ao longo de todo o desenvolvimento do projeto para explicação de erros, melhorias de código e implementação de código repetitivo.
### Exemplo de prompts
```txt
Explique detalhadamente o relatório abaixo do npm audit. Explique o que significa essa vulnerabilidade, por que ela foi detectada no meu projeto, qual o impacto dela na aplicaçÃo, se minha aplicação está realmente vulnerável e como corrigi-la corretamente. Explique também como o npm audit identifica esse problema, o que o comando npm audit fix faz internamente e quais cuidados devo ter antes de executá-lo. Analise o relatório linha por linha e apresente a solução recomendada seguindo boas práticas # npm audit report react-router 7.12.0 - 8.2.0 Severity: high...
```
```txt
Explique detalhadamente como implementar a criação automática de dados fakes em um projeto com Prisma, de forma semelhante a um seed. Mostre como pode ser feito para popular o banco de dados sempre que necessário (comando específico no terminal), como utilizar o prisma db seed e organizar os arquivos de seed, criar relacionamentos entre entidades. Apresente exemplos completos em Node.js/TypeScript seguindo boas práticas, com foco em uma arquitetura escalável e de fácil manutenção
```
```txt
A partir do modelo proposto , implemente mais 10 exemplos para o seed: { titulo: "Cálculo Vol. 1 - James Stewart", descricao: "Produto tal, usado, bom estado", categoria: "Livros", preco: 45, isDoacao: false, userId: "seed-user-1", }
```
### Claude
- Usado ao longo de todo o desenvolvimento do projeto — planejamento de arquitetura, revisão de código, debugging e implementação de páginas cruas.
### Exemplo de prompts
```txt
Preciso de uma página de Cadastro em React + TypeScript
SSeguindo a mesma Stack
Já existe uma página de Login em src/pages/Login.tsx com um formulário parecido (fetch direto, sem bibliotecas extras) — pode seguir o mesmo estilo de código e visual dela. O arquivo novo fica em src/pages/Register.tsx
A API de cadastro já existe e funciona assim:
POST http://localhost:3333/users
Body: { "nome": string, "email": string, "senha": string }
Sucesso (201): { "id": string, "nome": string, "email": string, "createdAt": string }
Erro de e-mail duplicado (409): { "error": "E-mail já cadastrado" }
Erro de validação (400): { "error": { "fieldErrors": { "nome": string[], "email": string[], "senha": string[] } } }
Regras de validação da senha: mínimo 6 caracteres
O que a página precisa fazer:
1. Formulário com campos de nome, e-mail e senha
2. Ao enviar, chamar essa API com fetch
3. Se der certo, redirecionar o usuário para "/login" (ele loga manualmente depois)
4. Se der erro (e-mail duplicado ou validação), mostrar uma mensagem clara na tela
5. Desabilitar o botão enquanto está carregando
6. Estilizar com Tailwind, simples e responsivo, mantendo a mesma cara da página de Login
tudo tipado em TypeScript
```
## Reflexão crítica e erros da IA
- O erro de tipo no `anuncios.service.ts`: quando a IA removeu o campo `userId` do schema Zod (pra ele passar a vir do token JWT em vez do body), o `criarAnuncio` no service ficou com uma assinatura de função desatualizada — ainda esperava receber `userId` dentro do mesmo objeto de dados entretanto o tipo não permitia mais isso. O `tsc` acusou o erro, e a correção foi separar `userId` como um parâmetro da função. Nesse exemplo a IA me sugeriu uma mudança entretanto ao aplicar (gerando erro), deve ser ratreado os efeitos do mesmo em outros arquivos que dependem daquele código. 
- Pedi ajuda pra criar as páginas de Login e Cadastro com prompts parecidos, mas o do Cadastro foi mais detalhado, incluindo tratamento de erros de validação (formato objeto), já o do Login não. Com isso o Login só tratava erros como texto simples e quebraria se a API respondesse com um erro de validação. Mais tarde fiz uma revisão do que foi feito com a IA e localizei o problema.A correção foi replicar no Login o mesmo tratamento que já existia no Cadastro.