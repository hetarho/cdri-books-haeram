import { useCallback } from 'react';
import { DEFAULT_STORAGE_KEY } from '../constant/config';

export function useBookHistory() {
  const getBookHistory = useCallback(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(DEFAULT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
    } catch {
      return [];
    }
  }, []);

  return { getBookHistory };
}
