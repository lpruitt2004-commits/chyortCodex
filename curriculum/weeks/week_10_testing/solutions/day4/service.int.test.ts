import { InMemoryRepo } from './repository';
import { TaskService } from './service';

describe('[solutions] TaskService integration', () => {
  it('validates and enforces uniqueness', async () => {
    const svc = new TaskService(new InMemoryRepo());
    await expect(svc.create('')).rejects.toThrow('Invalid title');
    await expect(svc.create('  ')).rejects.toThrow('Invalid title');

    const a = await svc.create('Alpha');
    expect(a).toEqual({ id: 1, title: 'Alpha' });
    await expect(svc.create('Alpha')).rejects.toThrow('Duplicate title');
  });

  it('lists and removes', async () => {
    const svc = new TaskService(new InMemoryRepo());
    await svc.create('A');
    await svc.create('B');
    expect((await svc.list()).map(t => t.title)).toEqual(['A', 'B']);

    expect(await svc.remove(1)).toBe(true);
    expect(await svc.remove(1)).toBe(false);
  });
});
