import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import fastifyCookie from "@fastify/cookie";

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

