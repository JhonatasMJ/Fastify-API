import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import {
  createTransactionBodySchema,
  getTransactionParamsSchema,
} from "../schemas/transactionsSchemas";
import { checkSessionIdExist } from "../middlewares/check-session-id-exist";

export async function transactionsRoutes(app: FastifyInstance) {
  //resumo das transações, soma todas as transações de credito e retorna o total, as: "amount" é o nome da coluna que será retornada, nao precisa ser o mesmo nome da coluna do banco de dados. PreHandler é um middleware que será executado antes da rota, no caso, verificar se a sessionId existe. Hooks sao funções que sao executadas antes ou depois de uma rota.
  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const summary = await knex("transactions")
        .where("session_id", sessionId)
        .sum("amount", { as: "amount" })
        .first();
      return { summary };
    },
  );

  //listar todas as transações, preHandler é um middleware que será executado antes da rota, no caso, verificar se a sessionId existe.
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      //Só ira listar as transações que pertencem a sessão do usuário
      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select();
      return { transactions };
    },
  );

  //listar uma transação específica, preHandler é um middleware que será executado antes da rota, no caso, verificar se a sessionId existe.
  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const { id } = getTransactionParamsSchema.parse(request.params);
      const transaction = await knex("transactions")
        .where({ id, session_id: sessionId })
        .first();
      return { transaction };
    },
  );

  //criar uma transação
  app.post("/", async (request, reply) => {
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    let sessionId = request.cookies.sessionId;

    //Se nao tiver sessionId, cria uma nova sessionId
    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, //7 dias
      });
    }

    //Se for credito, o amount é positivo, se for debito, o amount é negativo, para nao precisar fazer uma verificação no banco de dados.
    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send({
      message: "Transação criada com sucesso",
    });
  });
}
