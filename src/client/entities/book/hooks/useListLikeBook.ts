import { useQuery } from '@tanstack/react-query';
import { listLikeBookAction } from '../api/list-like-book.action';

export function useListLikeBook() {
  return useQuery({
    queryKey: ['like-book'],
    queryFn: () => listLikeBookAction(),
  });
}

