import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeBookAction } from '../api/like-book.action';
import { Book } from '@shared/types/book';

export function useLikeBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: Book) => likeBookAction(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like-book'] });
    },
  });
}

