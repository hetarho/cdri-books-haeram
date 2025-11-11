import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBookHistoryAction } from '../api/update-book-history.action';

export function useUpdateBookHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (term: string) => updateBookHistoryAction(term),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book-history'] });
    },
  });
}
