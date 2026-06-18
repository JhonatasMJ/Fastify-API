import fastify from "fastify";
import { knex } from "./database";
import crypto from 'node:crypto';

const app = fastify();

app.get('/hello', async (req, res) => {
    const transaction = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000,
    }).returning('*');
    return transaction;
});


app.listen({ port: 3000 }).then(() => {
    console.log('Server is running on port 3000');
});

