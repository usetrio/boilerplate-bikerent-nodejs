import prismaClient from '@/external/repository/prisma/prisma-client';
import app from '@/main/config/app';
import request from 'supertest';
import { clearPrismaDatabase } from './clear-database';

describe('List bikes route', () => {
  it('list bikes should return bikes and 200', async () => {
    await clearPrismaDatabase();
    await prismaClient.candidate.create({
      data: {
        email: 'first@candidate.com',
        name: 'First Candidate',
        token: 'a-token',
      },
    });
    await request(app)
      .get('/api/bikes')
      .set('authorization', 'a-token')
      .send({})
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});
