import { FastifyInstance } from "fastify";
import { knex } from "../database";

import { randomUUID } from 'node:crypto';
import { createTransactionBodySchema } from "../schemas/transactions/transactionsBodySchema";

export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        
            const {title, amount, type} = createTransactionBodySchema.parse(request.body);

            //Se for credito, o amount é positivo, se for debito, o amount é negativo, para nao precisar fazer uma verificação no banco de dados.
            await knex('transactions').insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1, 
            })
        
        return reply.status(201).send({
            message: 'Transação criada com sucesso',
        });
    });
}
    