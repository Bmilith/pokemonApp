/**
 * Checks if any of the filter values match (partially) any of the given items.
 *
 * @param items - An array of strings to be filtered (e.g., Pokémon abilities or types).
 * @param filterValues - A string or array of strings representing the filter criteria.
 * @returns true if at least one filter value matches any item (case-insensitive), false otherwise.
 */
export function extractFilterParams(
  items: string[],
  filterValues: string | string[]
): boolean {
  // Normalize filterValues to an array of lowercase strings
  const filterArray = Array.isArray(filterValues)
    ? filterValues.map((fv) => fv.toLowerCase())
    : [filterValues.toLowerCase()];

  // Check if any item includes any of the filter values (case-insensitive)
  return items.some((item) =>
    filterArray.some((fv) => item.toLowerCase().includes(fv))
  );
}
