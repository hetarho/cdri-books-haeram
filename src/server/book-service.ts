import Container, { Service } from 'typedi';
import { ListBookUsecase } from './domain/book/usecases/list-book.usecase';
import { BookSearchType, BookSortType } from '@shared/types/book';
import './domain/book';

@Service()
export class BookService {
  async listBooks(request: {
    page: number;
    size: number;
    query: string;
    searchType: BookSearchType;
    sort: BookSortType;
  }): Promise<{
    books: import('@shared/types/book').Book[];
    totalCount: number;
    totalPage: number;
    currentPage: number;
    hasNext: boolean;
  }> {
    return Container.get(ListBookUsecase).execute(request);
  }
}
