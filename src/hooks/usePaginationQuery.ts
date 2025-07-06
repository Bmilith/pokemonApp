import { useQueryParams } from './useQueryParams';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/baseConstants';
import type { PaginationQuery } from '@/types/hooks';

export const usePaginationQuery = (): PaginationQuery => {
  const [params, setParams] = useQueryParams();

  const page = Number(params.page) || DEFAULT_PAGE;
  const pageSize = Number(params.pageSize) || DEFAULT_PAGE_SIZE;

  const updatePage = (newPage: number) => {
    setParams({
      page: String(newPage),
      pageSize: String(pageSize),
      search: params.search || '',
    });
  };

  return { page, pageSize, updatePage };
};
