import request from 'supertest';
import app from './app';

describe('[solutions] Tasks API', () => {
  it('health check', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('CRUD happy path', async () => {
    const c = await request(app).post('/tasks').send({ title: 'Ship' });
    expect(c.status).toBe(201);
    expect(c.body).toEqual({ id: 1, title: 'Ship' });

    const list = await request(app).get('/tasks');
    expect(list.body).toEqual([{ id: 1, title: 'Ship' }]);

    const del = await request(app).delete('/tasks/1');
    expect(del.status).toBe(204);

    const delMissing = await request(app).delete('/tasks/1');
    expect(delMissing.status).toBe(404);
  });
});
