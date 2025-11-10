import { Book } from '@shared/types/book';

export const ME_REPOSITORY_TOKEN = 'ME_REPOSITORY_TOKEN';

export interface IMeRepository {
  addLikeBook(book: Book): Promise<void>;
  removeLikeBook(book: Book): Promise<void>;
  listMyLikedBooks(): Promise<Book[]>;
}
