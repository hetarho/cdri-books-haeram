import { Typography } from '@client/shared';
import Image from 'next/image';

export function EmptyBookPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex w-full shrink-0 flex-col items-center justify-center gap-6 pt-30">
      <Image src="/images/book.svg" alt="empty-like" width={80} height={80} />
      <Typography.Caption className="text-text-secondary">{title}</Typography.Caption>
    </div>
  );
}
