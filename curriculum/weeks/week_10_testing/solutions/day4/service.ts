import type { Task, TaskRepo } from './repository';

export class TaskService {
  constructor(private repo: TaskRepo) {}

  async create(title: string): Promise<Task> {
    const t = (title ?? '').trim();
    if (!t) throw new Error('Invalid title');
    if (await this.repo.existsByTitle(t)) throw new Error('Duplicate title');
    return this.repo.add(t);
  }

  async list(): Promise<Task[]> {
    return this.repo.list();
  }

  async remove(id: number): Promise<boolean> {
    return this.repo.remove(id);
  }
}
