export interface HttpClient {
  get: (url: string) => Promise<{ name: string }>
}

export async function getUserName(id: number, client: HttpClient): Promise<string> {
  // TODO: Use client.get(`/users/${id}`) and return name; propagate errors
  throw new Error('Not implemented');
}
