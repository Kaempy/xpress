import * as React from 'react';

import { cn } from '@src/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
    return (
      <div className={cn('relative w-full')}>
        <input
          type={showPassword ? 'text' : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-0 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            <span className="material-icons">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
