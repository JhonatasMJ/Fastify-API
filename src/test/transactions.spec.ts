import { test, beforeAll, afterAll, describe } from "vitest";
import request from "supertest";
import { app } from "../app";

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
});
