'use client';

import { BookCard, EmptyBookPlaceholder, useListLikeBook, useUnlikeBook } from '@client/entities';
import { Typography } from '@client/shared';
import Image from 'next/image';
export function LikePage() {
  const { data: likeBooks } = useListLikeBook();
  const { mutate: unlikeBook } = useUnlikeBook();
  return (
    <div className="flex min-h-0 w-full max-w-240 flex-1 flex-col items-start pt-16 pb-20">
      <Typography.Title2>내가 찜한 책</Typography.Title2>
      <div className="mt-6 flex w-full shrink-0 gap-4">
        <Typography.Caption>찜한 책</Typography.Caption>
        <Typography.Caption>
          총 <span className="text-primary font-bold">{likeBooks?.length ?? 0}</span>건
        </Typography.Caption>
      </div>
      <div className="mt-6 flex w-full shrink-0 flex-col gap-4">
        {likeBooks?.map((book) => (
          <BookCard
            key={book.url}
            book={book}
            onClickBuyButton={() => {
              if (!book.url) return;
              window.open(book.url, '_blank', 'noopener,noreferrer');
            }}
            onClickLikeButton={() => {
              unlikeBook(book);
            }}
            isLiked={true}
          />
        ))}
        {likeBooks?.length === 0 && (
          <EmptyBookPlaceholder title="찜한 책이 없습니다." />
        )}
      </div>
    </div>
  );
}
