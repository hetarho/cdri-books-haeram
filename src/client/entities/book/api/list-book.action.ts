'use server';

import { BookService } from '@server/book-service';
import { BookSearchType, BookSortType } from '@shared/types/book';
import Container from 'typedi';

export async function listBookAction(request: {
  page: number;
  size: number;
  query: string;
  searchType: BookSearchType;
  sort: BookSortType;
}) {
  return await Container.get(BookService).listBooks(request);
}
