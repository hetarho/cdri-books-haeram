'use client';

import { deleteBookHistory } from '../utils/book-history-storage';

export async function deleteBookHistoryAction(term: string): Promise<void> {
  deleteBookHistory(term);
}

