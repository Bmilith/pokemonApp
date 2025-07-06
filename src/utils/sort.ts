export type SortOrder = 'asc' | 'desc';

export function sortByName<T extends { name: string }>(
  items: T[],
  order: SortOrder = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    return order === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
}
