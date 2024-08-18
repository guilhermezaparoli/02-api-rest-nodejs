import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, response) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body
    );
    // nada abaixo vai executar se houver um erro no parse

  await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });
    return response.status(201).send('Transação cadastrada com sucesso!')
  });

}
