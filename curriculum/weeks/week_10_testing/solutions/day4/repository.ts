export interface Task { id: number; title: string }

export interface TaskRepo {
  add(title: string): Promise<Task>
  findById(id: number): Promise<Task | null>
  list(): Promise<Task[]>
  remove(id: number): Promise<boolean>
  existsByTitle(title: string): Promise<boolean>
}

export class InMemoryRepo implements TaskRepo {
  private tasks: Task[] = [];
  private nextId = 1;
  async add(title: string): Promise<Task> {
    const t = { id: this.nextId++, title };
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
