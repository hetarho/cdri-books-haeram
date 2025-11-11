import { useQuery } from '@tanstack/react-query';
import { listBookHistoryAction } from '../api/list-book-history.action';

export function useBookHistory() {
  return useQuery({
    queryKey: ['book-history'],
    queryFn: () => listBookHistoryAction(),
  });
}
