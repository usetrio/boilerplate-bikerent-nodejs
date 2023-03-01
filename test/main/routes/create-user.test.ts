import prismaClient from '@/external/repository/prisma/prisma-client';
import app from '@/main/config/app';
import request from 'supertest';
import { clearPrismaDatabase } from './clear-database';

describe('Create user route', () => {
  it('should create a new user', async () => {
    await clearPrismaDatabase();

    await prismaClient.candidate.create({
      data: {
        email: 'first@candidate.com',
        name: 'First Candidate',
        token: 'a-token',
      },
    });

    await request(app)
      .post('/api/users')
      .set('authorization', 'a-token')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      })
      .expect(201)
      .then((res) => {
        expect(res.body.name).toEqual('John Doe');
        expect(res.body.id).not.toBeUndefined();
      });
  });
});
