'use client';

import { updateBookHistory } from '../utils/book-history-storage';

export async function updateBookHistoryAction(term: string): Promise<void> {
  updateBookHistory(term);
}

