import { Service } from 'typedi';
import { IBookRepository, BOOK_REPOSITORY_TOKEN } from '../usecases/interfaces/book.repository.interface';
import { BookSearchType, BookSortType } from '@shared/types/book';
import { BookModel } from '@server/model/book.model';
import { KAKAO_API_BASE_URL } from '@server/shared/config/urls';
import { KAKAO_API_KEY } from '@server/shared/config/keys';
import { makeQuery } from '@server/shared/utils/make-query';

@Service(BOOK_REPOSITORY_TOKEN)
export class BookRepository implements IBookRepository {
  constructor() {
    if (!KAKAO_API_BASE_URL || !KAKAO_API_KEY) {
      throw new Error('Missing required environment variables: KAKAO_API_BASE_URL, KAKAO_API_KEY');
    }
  }

  async findAll(request: {
    page: number;
    size: number;
    query: string;
    searchType: BookSearchType;
    sort: BookSortType;
  }): Promise<{
    books: BookModel[];
    meta: {
      total_count: number;
      pageable_count: number;
      is_end: boolean;
    };
  }> {
    const query = makeQuery([
      { key: 'query', value: request.query},
      { key: 'page', value: request.page.toString() },
      { key: 'size', value: request.size.toString() },
      { key: 'sort', value: request.sort },
      { key: 'target', value: request.searchType },
    ]);

    const url = `${KAKAO_API_BASE_URL}/v3/search/book?${query}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Kakao API error: ${response.status} ${response.statusText}`);
    }

    const data: {
      documents: BookModel[];
      meta: {
        total_count: number;
        pageable_count: number;
        is_end: boolean;
      };
    } = await response.json();

    return {
      books: data.documents,
      meta: data.meta,
    };
  }
}
