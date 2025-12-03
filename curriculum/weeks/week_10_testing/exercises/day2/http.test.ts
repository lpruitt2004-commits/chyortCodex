import { getUserName, HttpClient } from './http';

describe('getUserName', () => {
  it('returns name from client', async () => {
    const client: HttpClient = {
      get: jest.fn().mockResolvedValue({ name: 'Ada' })
    };
    await expect(getUserName(7, client)).resolves.toBe('Ada');
    expect(client.get).toHaveBeenCalledWith('/users/7');
  });

  it('propagates errors', async () => {
    const boom = new Error('boom');
    const client: HttpClient = {
      get: jest.fn().mockRejectedValue(boom)
    };
    await expect(getUserName(1, client)).rejects.toBe(boom);
  });
});
