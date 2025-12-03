export interface Task { id: number; title: string }

export function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export function asNumber(v: unknown): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  throw new TypeError('Not a valid number');
}

export function taskBuilder(overrides: Partial<Task> = {}): Task {
  return { id: 1, title: 'Task', ...overrides };
}
