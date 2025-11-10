import { Service } from 'typedi';
import { IMeRepository, ME_REPOSITORY_TOKEN } from '../usecase/interface/me.repository.interface';
import { Book } from '@shared/types/book';

@Service(ME_REPOSITORY_TOKEN)
export class MeRepository implements IMeRepository {
  async addLikeBook(book: Book): Promise<void> {
    const liked = readLikedBooks();
    const exists = liked.some((b) => isSameBook(b, book));
    if (!exists) {
      liked.push(book);
      writeLikedBooks(liked);
    }
  }

  async removeLikeBook(book: Book): Promise<void> {
    const liked = readLikedBooks();
    const next = liked.filter((b) => !isSameBook(b, book));
    writeLikedBooks(next);
  }

  async listMyLikedBooks(): Promise<Book[]> {
    return readLikedBooks();
  }
}

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
  return (
    a.title === b.title &&
    a.description === b.description &&
    a.price === b.price &&
    (a.salePrice ?? null) === (b.salePrice ?? null) &&
    arrayShallowEqual(a.authors, b.authors)
  );
}

function arrayShallowEqual(a: string[], b: string[]): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
