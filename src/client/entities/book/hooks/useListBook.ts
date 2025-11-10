import { useInfiniteQuery } from '@tanstack/react-query';
import { listBookAction } from '../api/list-book.action';
import { BookSearchType, BookSortType } from '@shared/types/book';

export function useListBook({
  searchType,
  sort,
  query,
  page,
  size,
}: {
  searchType: BookSearchType;
  sort: BookSortType;
  query: string;
  page: number;
  size: number;
}) {
  return useInfiniteQuery({
    queryKey: [
      'listBook',
      {
        searchType,
        sort,
        query,
        size,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      listBookAction({
        page: pageParam,
        size,
        query,
        searchType,
        sort,
      }),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
    initialPageParam: page ?? 1,
  });
}
