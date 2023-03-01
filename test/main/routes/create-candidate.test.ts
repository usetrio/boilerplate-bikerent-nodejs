import app from '@/main/config/app';
import request from 'supertest';
import { clearPrismaDatabase } from './clear-database';

describe('Create candidate route', () => {
  it('should create or return candidate', async () => {
    await clearPrismaDatabase();
    await request(app)
      .post('/api/candidates')
      .send({
        email: 'john@doe.com',
        name: 'John Doe',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.token).not.toBeUndefined();
      });
  });
});
