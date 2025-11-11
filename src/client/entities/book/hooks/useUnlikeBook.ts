import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unlikeBookAction } from '../api/unlike-book.action';
import { Book } from '@shared/types/book';

export function useUnlikeBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: Book) => unlikeBookAction(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like-book'] });
    },
  });
}

