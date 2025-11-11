import { Book } from '@shared/types/book';

const STORAGE_KEY = 'me:likedBooks';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

let cachedBooks: Book[] | null = null;

if (isBrowser()) {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      cachedBooks = null;
    }
  });
}

function readLikedBooks(): Book[] {
  if (!isBrowser()) return [];
  if (cachedBooks !== null) return cachedBooks;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    cachedBooks = parsed.filter(isValidBook);
    return cachedBooks;
  } catch {
    return [];
  }
}

function writeLikedBooks(books: Book[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Failed to save liked books', error);
  }
}

function isSameBook(a: Book, b: Book): boolean {
  return a.isbn === b.isbn && a.isbn.length > 0;
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

function isValidBook(obj: unknown): obj is Book {
  if (typeof obj !== 'object' || obj === null) return false;
  const book = obj as Book;
  return book.isbn.length > 0 && typeof book.title === 'string' && Array.isArray(book.authors);
}
