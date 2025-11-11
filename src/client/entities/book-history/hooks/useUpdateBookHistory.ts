'use client';

import { useCallback } from 'react';
import { DEFAULT_MAX_ITEMS, DEFAULT_STORAGE_KEY } from '../constant/config';
import { useBookHistory } from './useBookHistory';

export function useUpdateBookHistory() {
  const { getBookHistory } = useBookHistory();

  const updateBookHistory = useCallback(
    (term: string) => {
      if (typeof window === 'undefined') return;
      const history = getBookHistory();
      const value = term.trim();
      if (!value) return;
      const newHistory = [value, ...history.filter((v) => v !== value)].slice(0, DEFAULT_MAX_ITEMS);
      localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(newHistory));
    },
    [getBookHistory],
  );

  return { updateBookHistory };
}
