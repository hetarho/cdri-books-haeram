import { ComponentProps } from 'react';
import { cn } from '../utils';

const Title1 = ({ className, children, ...props }: ComponentProps<'h1'>) => {
  return (
    <h1 className={cn('text-2xl font-bold', className)} {...props}>
      {children}
    </h1>
  );
};

const Title2 = ({ className, children, ...props }: ComponentProps<'h2'>) => {
  return (
    <h2 className={cn('text-[22px] font-bold', className)} {...props}>
      {children}
    </h2>
  );
};

const Title3 = ({ className, children, ...props }: ComponentProps<'h3'>) => {
  return (
    <h3 className={cn('text-lg font-bold', className)} {...props}>
      {children}
    </h3>
  );
};

const Body1 = ({ className, children, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-[20px] font-medium', className)} {...props}>
      {children}
    </p>
  );
};

const Body2 = ({ className, children, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-sm font-medium', className)} {...props}>
      {children}
    </p>
  );
};

const Body2Bold = ({ className, children, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-sm font-bold', className)} {...props}>
      {children}
    </p>
  );
};

const Caption = ({ className, children, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-base font-medium', className)} {...props}>
      {children}
    </p>
  );
};

const Small = ({ className, children, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-[10px] font-medium', className)} {...props}>
      {children}
    </p>
  );
};

const Heading3Bold = ({ className, children, ...props }: ComponentProps<'h3'>) => {
  return (
    <h3 className={cn('text-[18px] font-bold', className)} {...props}>
      {children}
    </h3>
  );
};

const Heading3Thin = ({ className, children, ...props }: ComponentProps<'h3'>) => {
  return (
    <h3 className={cn('text-[18px] font-light', className)} {...props}>
      {children}
    </h3>
  );
};

export const Typography = {
  Title1,
  Title2,
  Title3,
  Body1,
  Body2,
  Body2Bold,
  Caption,
  Small,
  Heading3Bold,
  Heading3Thin,
};
