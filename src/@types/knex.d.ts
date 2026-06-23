//.d.ts é um arquivo de definição de tipos para o knex, ele é usado para definir os tipos de retorno das funções do knex.

import { Knex } from 'knex';


//tipo as minhas tabelas
declare module 'knex/types/tables' {
    export interface Tables {
        transactions: {
            id: string;
            title: string;
            amount: number;
            created_at: string;
            session_id?: string;
        };
    }
}