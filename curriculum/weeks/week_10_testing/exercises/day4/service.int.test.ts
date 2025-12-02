import { TaskRepo, Task } from './repository';
import { TaskService } from './service';

class FakeRepo implements TaskRepo {
  private tasks: Task[] = [];
  private id = 1;
  async add(title: string): Promise<Task> {
    const t = { id: this.id++, title };
    this.tasks.push(t);
    return t;
  }
  async findById(id: number): Promise<Task | null> {
    return this.tasks.find(t => t.id === id) ?? null;
  }
  async list(): Promise<Task[]> {
    return [...this.tasks];
  }
  async remove(id: number): Promise<boolean> {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }
  async existsByTitle(title: string): Promise<boolean> {
    return this.tasks.some(t => t.title === title);
  }
}

describe('TaskService (exercises)', () => {
  it('creates with validation and uniqueness', async () => {
    const svc = new TaskService(new FakeRepo());

    await expect(svc.create('  ')).rejects.toThrow('Invalid title');

    const a = await svc.create('Alpha');
    expect(a).toEqual({ id: 1, title: 'Alpha' });

    await expect(svc.create('Alpha')).rejects.toThrow('Duplicate title');
  });

  it('lists and removes', async () => {
    const svc = new TaskService(new FakeRepo());
    await svc.create('A');
    await svc.create('B');

    const list = await svc.list();
    expect(list.map(t => t.title)).toEqual(['A', 'B']);

    expect(await svc.remove(1)).toBe(true);
    expect(await svc.remove(1)).toBe(false);
  });
});
