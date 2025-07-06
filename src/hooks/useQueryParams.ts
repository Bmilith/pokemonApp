import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Params = Record<string, string | undefined>;

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsObj: Params = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const updateQueryParams = useCallback(
    (newParams: Params, options?: { replaceAll?: boolean }) => {
      const params = options?.replaceAll
        ? new URLSearchParams()
        : new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return [paramsObj, updateQueryParams] as const;
}
