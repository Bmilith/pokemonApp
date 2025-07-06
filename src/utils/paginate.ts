export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): T[] {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export const generatePageList = (
  currentPage: number,
  totalPages: number,
  pageRange: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const startPage = Math.max(2, currentPage - pageRange);
  const endPage = Math.min(totalPages - 1, currentPage + pageRange);

  pages.push(1);

  if (startPage > 2) {
    pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
