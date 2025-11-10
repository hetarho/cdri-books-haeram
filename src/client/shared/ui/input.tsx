import * as React from 'react';

import { cn } from '@client/shared';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn('bg-light-gray h-12.5 rounded-full p-2.5', className)}
      {...props}
    />
  );
}

export { Input };
