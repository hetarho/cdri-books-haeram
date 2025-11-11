import { useCallback } from 'react';
import { DEFAULT_STORAGE_KEY } from '../constant/config';
import { useBookHistory } from './useBookHistory';

export function useDeleteBookHistory() {
  const { getBookHistory } = useBookHistory();

  const deleteBookHistory = useCallback(
    (term: string) => {
      if (typeof window === 'undefined') return;
      const history = getBookHistory();
      const value = term.trim();
      if (!value) return;
      const newHistory = history.filter((v) => v !== value);
      localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(newHistory));
    },
    [getBookHistory],
  );

  return { deleteBookHistory };
}
