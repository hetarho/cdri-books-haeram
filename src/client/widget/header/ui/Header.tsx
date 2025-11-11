'use client';

import { Typography } from '@client/shared';
import { usePathname } from 'next/navigation';
import { HeaderNav } from './HeaderNav';

export function Header() {
  const pathname = usePathname();
  return (
    <div className="flex h-20 w-full shrink-0 items-center justify-between">
      <Typography.Title1 className="shrink-0 tracking-normal">CERITCOS BOOKS</Typography.Title1>
      <div className="flex flex-1 justify-center gap-14">
        <HeaderNav href="/" label="도서 검색" isActive={pathname === '/'} />
        <HeaderNav href="/like" label="내가 찜한 책" isActive={pathname === '/like'} />
      </div>
      <div className="w-52" />
    </div>
  );
}
