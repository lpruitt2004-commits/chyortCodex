export interface Task { id: number; title: string }

export function isNonEmptyString(_v: unknown): _v is string {
  // TODO: return true if v is a string with non-empty trim()
  throw new Error('Not implemented');
}

export function asNumber(_v: unknown): number {
  // TODO: if number, return; if numeric string, parse; else throw TypeError
  throw new Error('Not implemented');
}

export function taskBuilder(overrides: Partial<Task> = {}): Task {
  // TODO: Build a Task with defaults { id: 1, title: 'Task' } and apply overrides
  throw new Error('Not implemented');
}
