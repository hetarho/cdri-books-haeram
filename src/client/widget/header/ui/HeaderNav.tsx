import { cn, Typography } from '@client/shared';
import Link from 'next/link';

export function HeaderNav({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link href={href} aria-current={isActive ? 'page' : undefined}>
      <Typography.Body1 className={cn(isActive && 'border-primary border-b')}>{label}</Typography.Body1>
    </Link>
  );
}
