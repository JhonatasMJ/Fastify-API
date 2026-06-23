import { FastifyInstance } from "fastify";
import { knex } from "../database";

import { randomUUID } from "node:crypto";
import {
  createTransactionBodySchema,
  getTransactionParamsSchema,
} from "../schemas/transactionsSchemas";

export async function transactionsRoutes(app: FastifyInstance) {
  //resumo das transações, soma todas as transações de credito e retorna o total, as: "amount" é o nome da coluna que será retornada, nao precisa ser o mesmo nome da coluna do banco de dados.
  app.get("/summary", async () => {
    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .first();
    return { summary };
  });

  //listar todas as transações
  app.get("/", async () => {
    const transactions = await knex("transactions").select();
    return { transactions };
  });

  //listar uma transação específica
  app.get("/:id", async (request) => {
    const { id } = getTransactionParamsSchema.parse(request.params);
    const transaction = await knex("transactions").where("id", id).first();
    return { transaction };
  });

  //criar uma transação
  app.post("/", async (request, reply) => {
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    //Se for credito, o amount é positivo, se for debito, o amount é negativo, para nao precisar fazer uma verificação no banco de dados.
    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send({
      message: "Transação criada com sucesso",
    });
  });
}
