import request from 'supertest';
import app from './app';

describe('Tasks API (exercises)', () => {
  it('GET /health ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('starts with empty tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Write tests' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, title: 'Write tests' });

    const list = await request(app).get('/tasks');
    expect(list.body).toEqual([{ id: 1, title: 'Write tests' }]);
  });

  it('validates task title', async () => {
    const bad1 = await request(app).post('/tasks').send({});
    expect(bad1.status).toBe(400);
    const bad2 = await request(app).post('/tasks').send({ title: 123 });
    expect(bad2.status).toBe(400);
  });

  it('deletes by id, returns 404 when not found', async () => {
    const resCreate = await request(app).post('/tasks').send({ title: 'Temp' });
    const id = resCreate.body.id;

    const delOk = await request(app).delete(`/tasks/${id}`);
    expect(delOk.status).toBe(204);

    const delMissing = await request(app).delete(`/tasks/${id}`);
    expect(delMissing.status).toBe(404);
  });
});
