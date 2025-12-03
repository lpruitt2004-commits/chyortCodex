export interface HttpClient {
  get: (url: string) => Promise<{ name: string }>
}

export async function getUserName(id: number, client: HttpClient): Promise<string> {
  const { name } = await client.get(`/users/${id}`);
  return name;
}
