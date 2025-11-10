import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@client/shared';

const buttonVariants = cva('flex items-center justify-center rounded-lg', {
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary/90',
      mono: 'bg-light-gray hover:bg-light-gray/90 text-text-secondary',
      outlineMono: 'border border-text-subtitle text-text-subtitle',
    },
    size: {
      l: 'h-12 px-2.5 font-medium',
      s: 'h-9 px-2.5 py-2 ',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'l',
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
