import { Book } from '@shared/types/book';

const STORAGE_KEY = 'me:likedBooks';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readLikedBooks(): Book[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Book[];
  } catch {
    return [];
  }
}

function writeLikedBooks(books: Book[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // ignore quota/serialization errors
  }
}

function isSameBook(a: Book, b: Book): boolean {
  return a.isbn === b.isbn;
}

export function getLikedBooks(): Book[] {
  return readLikedBooks();
}

export function addLikedBook(book: Book): void {
  const liked = readLikedBooks();
  const exists = liked.some((b) => isSameBook(b, book));
  if (!exists) {
    liked.push(book);
    writeLikedBooks(liked);
  }
}

export function removeLikedBook(book: Book): void {
  const liked = readLikedBooks();
  const next = liked.filter((b) => !isSameBook(b, book));
  writeLikedBooks(next);
}
