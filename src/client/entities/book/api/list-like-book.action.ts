'use client';

import { getLikedBooks } from '@shared/utils/liked-books-storage';

export async function listLikeBookAction(): Promise<import('@shared/types/book').Book[]> {
  return getLikedBooks();
}

