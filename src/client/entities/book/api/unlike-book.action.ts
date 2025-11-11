'use client';

import { Book } from '@shared/types/book';
import { removeLikedBook } from '../utils/liked-books-storage';

export async function unlikeBookAction(book: Book): Promise<void> {
  removeLikedBook(book);
}

