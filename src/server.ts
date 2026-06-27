import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import fastifyCookie from "@fastify/cookie";

//Teste unitarios = testes que testam uma unidade de codigo, uma funcao, uma classe, etc.

//Teste de integração = testes que testam a integracao entre duas ou mais unidades de codigo, uma funcao, uma classe, etc.

//Teste e2e - end to end = testes que testam a integracao entre a aplicacao e o ambiente externo, como um banco de dados, um servidor, etc. Simula um usuario usando a aplicacao.

//Piramide de testes = Teste Unitários, Depois (Integracao), Depois (E2E)

const app = fastify();

//npm i @fastify/cookie
app.register(fastifyCookie);

//Registra as rotas na aplicação, prefix é o prefixo da rota, no caso transactions
app.register(transactionsRoutes,{
    prefix: 'transactions',
});


app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on port ${env.PORT}`);
});

