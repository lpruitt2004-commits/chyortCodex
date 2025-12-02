export function capitalize(input: string): string {
  if (input.length === 0) return '';
  const [first, ...rest] = input;
  return first.toUpperCase() + rest.join('');
}
