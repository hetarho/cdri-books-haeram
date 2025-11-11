'use client';

import { getBookHistory } from '../utils/book-history-storage';

export async function listBookHistoryAction(): Promise<string[]> {
  return getBookHistory();
}

