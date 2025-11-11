'use client';

import { Book } from '@shared/types/book';
import { addLikedBook } from '@shared/utils/liked-books-storage';

export async function likeBookAction(book: Book): Promise<void> {
  addLikedBook(book);
}

