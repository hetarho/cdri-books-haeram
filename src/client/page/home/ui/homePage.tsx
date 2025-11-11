'use client';

import { useListBook, useUpdateBookHistory } from '@client/entities';
import { BookCard } from '@client/entities';
import { Typography } from '@client/shared';
import { useCallback, useState } from 'react';
import { BookSearchType, BookSortType } from '@shared/types/book';
import { InfinityContainer } from '@client/shared/ui/InfinityContainer';
import { BookSearch } from '@client/widget';

export function HomePage() {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState<BookSearchType>(BookSearchType.TITLE);
  const { updateBookHistory } = useUpdateBookHistory();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useListBook({
    searchType,
    sort: BookSortType.ACCURACY,
    query: search,
    page: 1,
    size: 10,
  });

  const books = data?.pages.flatMap((page) => page.books) ?? [];

  const handleReachBottom = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex min-h-0 w-full max-w-240 flex-1 flex-col items-center pt-26 pb-20">
      <div className="flex w-full shrink-0 flex-col gap-4">
        <Typography.Title2>도서 검색</Typography.Title2>
        <BookSearch
          onSubmit={({ search: nextSearch, searchType: nextType }) => {
            setSearch(nextSearch);
            setSearchType(nextType);
            updateBookHistory(nextSearch);
          }}
        />
      </div>
      <div className="mt-6 flex w-full shrink-0 gap-4">
        <Typography.Caption>도서 검색 결과</Typography.Caption>
        <Typography.Caption>
          총 <span className="text-primary font-bold">{data?.pages[0].totalCount ?? 0}</span>건
        </Typography.Caption>
      </div>
      <InfinityContainer
        className="mt-9 flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto"
        onReachBottom={books.length > 0 ? handleReachBottom : undefined}
      >
        {books.map((book, index) => (
          <BookCard key={`${book.title}-${index}`} book={book} onClickBuyButton={() => {
            window.location.href = book.url;
          }} />
        ))}
      </InfinityContainer>
    </div>
  );
}
