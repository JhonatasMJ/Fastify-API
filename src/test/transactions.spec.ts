import { test, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../app";
import knex from "knex";
import { execSync } from 'node:child_process';

//Teste unitarios = testes que testam uma unidade de codigo, uma funcao, uma classe, etc.

//Teste de integração = testes que testam a integracao entre duas ou mais unidades de codigo, uma funcao, uma classe, etc.

//Teste e2e - end to end = testes que testam a integracao entre a aplicacao e o ambiente externo, como um banco de dados, um servidor, etc. Simula um usuario usando a aplicacao.

//Piramide de testes = Teste Unitários, Depois (Integracao), Depois (E2E)

//Para teste vamos usar o vitest
//npm i -D vitest
//npm run test
//supertest é uma biblioteca para testar APIs

//Para testar a API, vamos usar o supertest
//npm i -D supertest
//npm i -D @types/supertest

//Descrição do teste, grupo de testes
describe("Transactions routes", () => {
  //Antes de todos os testes, vamos criar uma sessão, aguardar a aplicação estar pronta
  beforeAll(async () => {
    await app.ready();
  });

  //Depois de todos os testes, vamos fechar a aplicação
  afterAll(async () => {
    await app.close();
  });


  //Antes de cada teste, vamos rodar as migrations, desfazer todas as migrations e rodar todas as migrations novamente, apagar o banco de dados e criar novamente
  beforeEach(async () => {
    execSync("npm run knex -- migrate:rollback --all");
    execSync("npm run knex -- migrate:latest");
  });

  //Teste Criar uma nova transação
  test("Create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  //Teste Listar todas as transações
  test("List all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");
    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
      .expect(200);

      //Verificar se a resposta contém o titulo e o amount da transação criada
      expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
            title: "New transaction",
            amount: 5000,
        })
      ])
  });
});
