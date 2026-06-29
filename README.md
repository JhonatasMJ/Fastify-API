# Fastify API — Controle de Transações

API REST para gerenciamento de transações financeiras pessoais. Cada usuário é identificado por uma sessão via cookie, garantindo que só visualize e manipule as próprias transações.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime JavaScript |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Fastify](https://fastify.dev/) | Framework HTTP |
| [@fastify/cookie](https://github.com/fastify/fastify-cookie) | Gerenciamento de sessão via cookies |
| [Knex.js](https://knexjs.org/) | Query builder e migrations |
| [SQLite](https://www.sqlite.org/) | Banco de dados |
| [Zod](https://zod.dev/) | Validação de variáveis de ambiente e payloads |
| [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest) | Testes E2E |
| [ESLint](https://eslint.org/) | Padronização de código |

## Funcionalidades

- Criar transações de **crédito** (soma ao saldo) ou **débito** (subtrai do saldo)
- Listar todas as transações do usuário
- Visualizar uma transação específica
- Obter o resumo (saldo total) da conta
- Identificação do usuário entre requisições via cookie `sessionId`
- Isolamento de dados: cada usuário só acessa as próprias transações

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm

## Como rodar

### 1. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd Fastify-API
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

Exemplo de `.env`:

```env
NODE_ENV=development
DATABASE_URL=./db/app.db
PORT=3333
```

### 3. Executar as migrations

```bash
npm run knex -- migrate:latest
```

### 4. Iniciar o servidor em modo desenvolvimento

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3333`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor com hot reload |
| `npm run test` | Executa os testes com Vitest |
| `npm run lint` | Executa o ESLint e corrige automaticamente |
| `npm run knex -- migrate:latest` | Aplica as migrations |
| `npm run knex -- migrate:rollback` | Desfaz a última migration |
| `npm run knex -- migrate:status` | Exibe o status das migrations |

## Rotas da API

Todas as rotas estão sob o prefixo `/transactions`.

### `POST /transactions`

Cria uma nova transação. Se o cookie `sessionId` não existir, um novo é gerado automaticamente (válido por 7 dias).

**Body (JSON):**

```json
{
  "title": "Salário",
  "amount": 5000,
  "type": "credit"
}
```

| Campo | Tipo | Valores |
|---|---|---|
| `title` | `string` | Título da transação |
| `amount` | `number` | Valor positivo |
| `type` | `string` | `"credit"` ou `"debit"` |

**Resposta:** `201 Created`

```json
{
  "message": "Transação criada com sucesso"
}
```

---

### `GET /transactions`

Lista todas as transações do usuário autenticado.

**Requer:** cookie `sessionId`

**Resposta:** `200 OK`

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "amount": 5000,
      "session_id": "uuid",
      "created_at": "2026-06-18T18:55:02.000Z"
    }
  ]
}
```

---

### `GET /transactions/:id`

Retorna uma transação específica pelo ID.

**Requer:** cookie `sessionId`

**Parâmetros:** `id` (UUID)

**Resposta:** `200 OK`

```json
{
  "transaction": {
    "id": "uuid",
    "title": "Salário",
    "amount": 5000,
    "session_id": "uuid",
    "created_at": "2026-06-18T18:55:02.000Z"
  }
}
```

---

### `GET /transactions/summary`

Retorna o resumo (soma de todas as transações) da conta do usuário.

**Requer:** cookie `sessionId`

**Resposta:** `200 OK`

```json
{
  "summary": {
    "amount": 3500
  }
}
```

---

### Autenticação

A autenticação é feita via cookie `sessionId`. Rotas protegidas retornam `401 Unauthorized` quando o cookie não está presente:

```json
{
  "error": "Unauthorized"
}
```

## Testes

Para rodar os testes, configure o arquivo `.env.test`:

```bash
cp .env.test.example .env.test
```

Exemplo de `.env.test`:

```env
NODE_ENV=test
DATABASE_URL=./db/test.db
```

Em seguida:

```bash
npm run test
```

Os testes são E2E e cobrem criação, listagem, busca por ID e resumo de transações.

## Estrutura do projeto

```
├── db/
│   └── migrations/       # Migrations do banco de dados
├── src/
│   ├── @types/           # Tipagens customizadas
│   ├── env/              # Validação de variáveis de ambiente
│   ├── middlewares/      # Middlewares (verificação de sessão)
│   ├── routes/           # Rotas da API
│   ├── schemas/          # Schemas de validação (Zod)
│   ├── test/             # Testes E2E
│   ├── app.ts            # Configuração do Fastify
│   ├── database.ts       # Configuração do Knex
│   └── server.ts         # Entry point
├── knexfile.ts
└── package.json
```

## Licença

Este projeto foi desenvolvido como parte dos estudos na [Rocketseat](https://www.rocketseat.com.br/).
