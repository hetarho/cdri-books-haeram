import { BOOK_REPOSITORY_TOKEN, IBookRepository } from './interfaces/book.repository.interface';
import Container, { Service } from 'typedi';
import { Book, BookSearchType, BookSortType } from '@shared/types/book';

@Service()
export class ListBookUsecase {
  private readonly bookRepository: IBookRepository;

  constructor() {
    this.bookRepository = Container.get(BOOK_REPOSITORY_TOKEN);
  }

  async execute(request: ListBookRequest): Promise<ListBookResponse> {
    const { books, meta } = await this.bookRepository.findAll(request);
    return {
      books: books.map((book) => ({
        title: book.title,
        description: book.contents,
        authors: book.authors,
        price: book.price,
        salePrice: book.sale_price,
        thumbnail: book.thumbnail,
        url: book.url,
      })),
      totalCount: meta.total_count,
      totalPage: meta.pageable_count,
      hasNext: !meta.is_end,
      currentPage: request.page,
    };
  }
}

interface ListBookRequest {
  page: number;
  size: number;
  query: string;
  searchType: BookSearchType;
  sort: BookSortType;
}

interface ListBookResponse {
  books: Book[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
  hasNext: boolean;
}
