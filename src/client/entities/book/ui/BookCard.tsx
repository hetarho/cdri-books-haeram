'use client';

import { Button, cn, Icon, Typography } from '@client/shared';
import { Book } from '@shared/types/book';
import Image from 'next/image';
import { useState } from 'react';

export function BookCard({
  book,
  onClickBuyButton,
  onClickLikeButton,
  isLiked,
}: {
  book: Book;
  onClickBuyButton: () => void;
  onClickLikeButton: () => void;
  isLiked: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'flex h-25 w-full shrink-0 items-center overflow-hidden border-b border-[#D2D6DA] pl-12 transition-all duration-300',
        {
          'h-86 pt-6 pb-10': isOpen,
        },
      )}
    >
      <div
        className={cn('relative h-17 w-12 transition-all duration-300', {
          'h-70 w-52.5': isOpen,
        })}
      >
        {book.thumbnail && (
          <Image
            src={book.thumbnail}
            alt={book.title}
            width={isOpen ? 210 : 48}
            height={isOpen ? 280 : 68}
            className={cn('h-full w-full object-cover transition-all duration-300')}
          />
        )}
        <Button
          variant="icon"
          size="icon"
          className={cn('absolute top-0 right-0 size-4 transition-all duration-300', {
            'size-6 right-2 top-2': isOpen,
          })}
          onClick={onClickLikeButton}
        >
          {isLiked ? (
            <Icon.HeartFill className="fill-red h-full w-full" />
          ) : (
            <Icon.HeartLine className="h-full w-full fill-white" />
          )}
        </Button>
      </div>
      <div
        className={cn('ml-12 flex h-full min-w-0 flex-1 flex-col justify-center', {
          'ml-8 justify-start': isOpen,
        })}
      >
        <div className="flex">
          <Typography.Title3
            className={cn('min-w-0 flex-1', {
              truncate: !isOpen,
            })}
          >
            {book.title}
          </Typography.Title3>
          <Typography.Body2 className="text-text-secondary ml-4 shrink-0 truncate">
            {book.authors.length < 3
              ? book.authors.join(', ')
              : `${book.authors.slice(0, 2).join(', ')} 외 ${book.authors.length - 2}명`}
          </Typography.Body2>
        </div>
        <div
          className={cn('text-text-secondary h-0 overflow-hidden opacity-0 transition-all duration-300', {
            'h-auto opacity-100': isOpen,
          })}
        >
          <p className="text-[14px] font-bold">책 소개</p>
          <Typography.Small className="text-text-secondary">{book.description}</Typography.Small>
        </div>
      </div>
      <div
        className={cn('flex transition-all duration-300', {
          'h-full flex-col-reverse items-end': isOpen,
        })}
      >
        {!isOpen && <Typography.Title3 className="ml-5.5 shrink-0">{`${book.price}원`}</Typography.Title3>}
        <Button
          className={cn('ml-14 w-[115px] shrink-0 transition-all duration-300', {
            'w-60': isOpen,
          })}
          onClick={onClickBuyButton}
        >
          구매하기
        </Button>
        {isOpen && (
          <div className="flex flex-1 flex-col items-end justify-end gap-2 pb-7">
            <div className="flex items-center gap-2">
              <Typography.Small>원가</Typography.Small>
              <Typography.Heading3Thin className={cn({ 'line-through': !!book.salePrice && book.salePrice !== -1 })}>
                {book.price}원
              </Typography.Heading3Thin>
            </div>
            {!!book.salePrice && book.salePrice !== -1 && (
              <div className="flex items-center gap-2">
                <Typography.Small>할인가</Typography.Small>
                <Typography.Heading3Bold>{book.salePrice}원</Typography.Heading3Bold>
              </div>
            )}
          </div>
        )}
        <Button variant="mono" className="ml-2 w-[115px] shrink-0 gap-[5px]" onClick={() => setIsOpen(!isOpen)}>
          상세보기
          <Icon.ChevronUp
            className={cn('h-2 w-3.5 rotate-180 fill-[#B1B8C0] transition-all duration-300', {
              'rotate-0': isOpen,
            })}
          />
        </Button>
      </div>
    </div>
  );
}
