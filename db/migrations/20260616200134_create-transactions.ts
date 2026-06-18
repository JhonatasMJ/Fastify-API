import type { Knex } from "knex";

// npm run knex -- migrate:make create-transactions
// npm run knex -- migrate:latest (aplica as migrations)
// npm run knex -- migrate:rollback (desfaz a ultima migration)
// npm run knex -- migrate:status (mostra o status das migrations)
// npm run knex -- migrate:make create-transactions (cria uma nova migration)
// npm run knex -- migrate:make create-transactions (cria uma nova migration)


//up- o que a migration faz
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}


//down- o que a migration desfaz, faz o contrario da up
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions');
}

