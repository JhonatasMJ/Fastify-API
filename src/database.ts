import {knex as setupKnex} from 'knex'

//Configuração do banco de dados, salva em um arquivo sqlite na pasta tmp
export const knex = setupKnex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db'
    }
})