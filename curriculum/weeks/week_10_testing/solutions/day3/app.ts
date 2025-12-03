import express from 'express';

export interface Task { id: number; title: string }

function createApp() {
  const app = express();
  app.use(express.json());

  let nextId = 1;
  const tasks: Task[] = [];

  app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get('/tasks', (_req, res) => {
    res.status(200).json(tasks);
  });

  app.post('/tasks', (req, res) => {
    const { title } = req.body ?? {};
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Invalid title' });
    }
    const task: Task = { id: nextId++, title };
    tasks.push(task);
    res.status(201).json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.sendStatus(404);
    tasks.splice(idx, 1);
    return res.sendStatus(204);
  });

  return app;
}

const app = createApp();
export default app;
export { createApp };
