import {knex as setupKnex, Knex} from 'knex'

//Configuração do banco de dados, salva em um arquivo sqlite na pasta tmp

//migrations: são arquivos que contém as alterações do banco de dados, para controlar as versões do banco de dados

//npm run knex -- migrate:make nome_da_migration

//npm i knex sqlite3


export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: './db/app.db'
    },
    useNullAsDefault: true, // Para não precisar definir valores nulos para cada campo
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
    
}

export const knex = setupKnex(config)