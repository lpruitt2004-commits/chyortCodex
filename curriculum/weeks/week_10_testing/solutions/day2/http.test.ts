import { getUserName, HttpClient } from './http';

describe('[solutions] getUserName', () => {
  it('fetches via client', async () => {
    const client: HttpClient = { get: async () => ({ name: 'Grace' }) };
    await expect(getUserName(3, client)).resolves.toBe('Grace');
  });
});
