import Container, { Service } from 'typedi';
import { ListBookUsecase } from './domain/book/usecases/list-book.usecase';
import { Book, BookSearchType, BookSortType } from '@shared/types/book';
import { LikeBookUsecase } from './domain/me/usecase/like-book.usecase';
import { UnlikeBookUsecase } from './domain/me/usecase/unlike-book.usecase';
import { ListMyLikedBookUsecase } from './domain/me/usecase/list-my-liked-book';
import './domain/book';
import './domain/me';

@Service()
export class BookService {
  async listBooks(request: {
    page: number;
    size: number;
    query: string;
    searchType: BookSearchType;
    sort: BookSortType;
  }): Promise<{
    books: Book[];
    totalCount: number;
    totalPage: number;
    currentPage: number;
    hasNext: boolean;
  }> {
    return Container.get(ListBookUsecase).execute(request);
  }

  async likeBook(request: { book: Book }): Promise<void> {
    return Container.get(LikeBookUsecase).execute(request);
  }

  async unlikeBook(request: { book: Book }): Promise<void> {
    return Container.get(UnlikeBookUsecase).execute(request);
  }

  async listMyLikedBooks(): Promise<Book[]> {
    return Container.get(ListMyLikedBookUsecase).execute();
  }
}
