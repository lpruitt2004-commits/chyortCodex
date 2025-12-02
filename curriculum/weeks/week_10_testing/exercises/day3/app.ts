import express from 'express';

export interface Task { id: number; title: string }

// TODO: Create an Express app with JSON body parsing and implement endpoints:
// GET /health -> { ok: true }
// GET /tasks -> Task[]
// POST /tasks -> validates { title: string }, returns created Task with incrementing id
// DELETE /tasks/:id -> 204 on success, 404 if not found
// Export the app as default

const app = express();
app.use(express.json());

// TODO: Implement routes

export default app;
