import fastify from "fastify";
import { transactionsRoutes } from "./routes/transactions";
import fastifyCookie from "@fastify/cookie";


export const app = fastify();

//npm i @fastify/cookie
app.register(fastifyCookie);

//Registra as rotas na aplicação, prefix é o prefixo da rota, no caso transactions
app.register(transactionsRoutes,{
    prefix: 'transactions',
});
