export const STORAGE_KEY = 'book_search_history';
export const MAX_ITEMS = 8;

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readBookHistory(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v) => typeof v === 'string') as string[];
  } catch {
    return [];
  }
}

function writeBookHistory(history: string[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore quota/serialization errors
  }
}

export function getBookHistory(): string[] {
  return readBookHistory();
}

export function updateBookHistory(term: string): void {
  const value = term.trim();
  if (!value) return;
  const history = readBookHistory();
  const newHistory = [value, ...history.filter((v) => v !== value)].slice(0, MAX_ITEMS);
  writeBookHistory(newHistory);
}

export function deleteBookHistory(term: string): void {
  const value = term.trim();
  if (!value) return;
  const history = readBookHistory();
  const newHistory = history.filter((v) => v !== value);
  writeBookHistory(newHistory);
}

