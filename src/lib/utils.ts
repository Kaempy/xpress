import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const handleErrorResponse = (error: { status: boolean; message: string }) => {
  toast.error('Failed', {
    description: error.message as string,
  });
};
export { cn, handleErrorResponse };
