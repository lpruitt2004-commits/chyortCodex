export interface Task { id: number; title: string }

export interface TaskRepo {
  add(title: string): Promise<Task>
  findById(id: number): Promise<Task | null>
  list(): Promise<Task[]>
  remove(id: number): Promise<boolean>
  existsByTitle(title: string): Promise<boolean>
}
