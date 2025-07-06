import { Button } from '@/components/core';
import { QueryDropdown } from '@/components/features';
import { PAGE_RANGE, PAGE_SIZE_VALUES } from '@/constants/baseConstants';
import { generatePageList } from '@/utils/paginate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: string[];
  pageRange?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSizeOptions = PAGE_SIZE_VALUES,
  pageRange = PAGE_RANGE,
}: PaginationProps) => {
  const pageList = generatePageList(currentPage, totalPages, pageRange);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
      <div className="flex flex-wrap justify-center gap-2">
        {pageList.map((page, index) =>
          typeof page === 'number' ? (
            <Button
              label={String(page)}
              onClick={() => onPageChange(page)}
              key={index}
              variant="primary"
              selected={page === currentPage}
            />
          ) : (
            <span
              key={index}
              className="px-2 text-sm select-none dark:text-white"
            >
              ...
            </span>
          )
        )}
      </div>
      <div className="flex justify-center gap-4 md:flex-row md:justify-start">
        <Button
          disabled={currentPage === 1}
          label={'Previous'}
          onClick={() => onPageChange(currentPage - 1)}
          variant="primary"
        />
        <Button
          disabled={currentPage === totalPages}
          label={'Next'}
          onClick={() => onPageChange(currentPage + 1)}
          variant="primary"
        />
      </div>

      <div className="flex items-center justify-center md:justify-end gap-2">
        <label
          htmlFor="pageSize"
          className="text-sm font-medium whitespace-nowrap dark:text-white"
        >
          Page size:
        </label>
        <QueryDropdown
          queryKey={'pageSize'}
          multiSelect={false}
          options={pageSizeOptions}
        />
      </div>
    </div>
  );
};
