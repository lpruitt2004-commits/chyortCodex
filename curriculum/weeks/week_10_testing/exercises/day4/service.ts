import type { Task, TaskRepo } from './repository';

export class TaskService {
  constructor(private repo: TaskRepo) {}

  async create(title: string): Promise<Task> {
    // TODO: trim; validate non-empty; enforce uniqueness via repo.existsByTitle; then add
    throw new Error('Not implemented');
  }

  async list(): Promise<Task[]> {
    // TODO: return repo.list()
    throw new Error('Not implemented');
  }

  async remove(id: number): Promise<boolean> {
    // TODO: delegate to repo.remove
    throw new Error('Not implemented');
  }
}
