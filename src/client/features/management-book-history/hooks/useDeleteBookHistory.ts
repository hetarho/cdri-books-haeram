import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookHistoryAction } from '../api/delete-book-history.action';

export function useDeleteBookHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (term: string) => deleteBookHistoryAction(term),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book-history'] });
    },
  });
}
