import { BookModel } from '@server/model/book.model';
import { BookSearchType, BookSortType } from '@shared/types/book';

export const BOOK_REPOSITORY_TOKEN = 'BOOK_REPOSITORY_TOKEN';
export interface IBookRepository {
  findAll({
    page,
    size,
    query,
    searchType,
    sort,
  }: {
    page: number;
    size: number;
    query?: string;
    searchType: BookSearchType;
    sort: BookSortType;
  }): Promise<{
    books: BookModel[];
    meta: {
      total_count: number;
      pageable_count: number;
      is_end: boolean;
    };
  }>;
}
