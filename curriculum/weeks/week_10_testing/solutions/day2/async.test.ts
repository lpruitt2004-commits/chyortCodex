import { delay, retry } from './async';

jest.useFakeTimers();

describe('[solutions] delay/retry', () => {
  it('delay resolves after ms', async () => {
    const p = delay(500);
    const spy = jest.fn();
    p.then(spy);
    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(spy).toHaveBeenCalled();
  });

  it('retry eventually resolves', async () => {
    const fn: jest.Mock<Promise<number>, []> = jest
      .fn()
      .mockRejectedValueOnce(new Error('x'))
      .mockResolvedValue(7);
    await expect(retry(fn, 2)).resolves.toBe(7);
  });
});
