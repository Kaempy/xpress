import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@src/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        active: 'border-transparent bg-[#27A7131A] text-[#27A713]',
        'awaiting-approval': 'border-transparent bg-[#FF99001A] text-[#FF9900]',
        deactivated: 'border-transparent bg-[#FF00001A] text-[#FF0000]',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
