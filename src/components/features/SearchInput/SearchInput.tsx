import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_SIZE } from '@/constants/baseConstants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';

export const SearchInput = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [queryParams, setQueryParams] = useQueryParams();
  const debouncedSearch = useDebounce(searchTerm, 400);
  const location = useLocation();

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (location.pathname === '/home' || location.pathname === '/home/') {
      const updates: Record<string, string | undefined> = {
        search: debouncedSearch.trim() === '' ? undefined : debouncedSearch,
        page: '1',
      };

      if (!queryParams.pageSize) {
        updates.pageSize = String(DEFAULT_PAGE_SIZE);
      }

      setQueryParams(updates);
    }
  }, [debouncedSearch, location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative group hidden sm:block">
      <input
        type="text"
        placeholder="Search"
        className={`transition-all duration-500 rounded-full border px-4 py-1  focus:outline-none dark:border-gray-800 dark:bg-gray-900 ${
          searchTerm.trim().length > 0
            ? 'w-[300px] border-gray-500'
            : 'w-0 group-hover:w-[300px] border-gray-500'
        }`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IoMdSearch className="text-xl text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-1 group-hover:text-pretty duration-300" />
    </div>
  );
};
