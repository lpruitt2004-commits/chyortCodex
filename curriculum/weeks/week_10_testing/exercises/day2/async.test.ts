import { delay, retry } from './async';

jest.useFakeTimers();

describe('delay', () => {
  it('resolves after given ms', async () => {
    const p = delay(1000);
    const spy = jest.fn();
    p.then(spy);

    jest.advanceTimersByTime(999);
    await Promise.resolve();
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await Promise.resolve();
    expect(spy).toHaveBeenCalled();
  });
});

describe('retry', () => {
  it('retries and eventually resolves', async () => {
    const fn: jest.Mock<Promise<number>, []> = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue(42);

    await expect(retry(fn, 3)).resolves.toBe(42);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws last error when exhausted', async () => {
    const err = new Error('boom');
    const fn: jest.Mock<Promise<number>, []> = jest.fn().mockRejectedValue(err);
    await expect(retry(fn, 2)).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
