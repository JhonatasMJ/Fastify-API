import { z } from "zod";

export const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
})


export const getTransactionParamsSchema = z.object({
    id: z.uuid(),
})