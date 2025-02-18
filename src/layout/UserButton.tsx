'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@src/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import FormButton from '@src/components/ui/formButton';
import { useAuth } from '@src/context/use-auth';
import { handleErrorResponse } from '@src/lib/utils';
import { ChevronDown, LogOut } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import avatar from '../../public/avatar.png';
const UserButton = () => {
  const { logout, isAuth, user } = useAuth();

  const handleConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      await new Promise<{ success: boolean; message: string }>(
        (resolve, reject) => {
          setTimeout(() => {
            if (isAuth) {
              logout(); // Properly log out user
              resolve({
                success: true,
                message: 'You have successfully logged out',
              });
            } else {
              reject({ success: false, message: 'You are not logged in' });
            }
          }, 1500);
        }
      );

      toast.success('Successful', {
        description: 'You have successfully logged out',
      });
    } catch (error) {
      handleErrorResponse(error as { status: boolean; message: string });
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex shrink-0 cursor-pointer items-center justify-center gap-2">
            <Avatar>
              <Image
                width={44}
                height={44}
                alt={user?.name ?? 'User profile'}
                src={avatar}
              />
              <AvatarFallback className="border">
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="m-0 p-0 text-base capitalize max-lg:hidden">
              {user?.name}&nbsp;
            </p>
            <ChevronDown size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-2 space-y-1">
              <p className="m-0 text-lg font-medium capitalize leading-none">
                {user?.name}&nbsp;
              </p>
              <p className="m-0 w-[195px] overflow-hidden text-ellipsis text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="w-full max-w-[400px]">
        <div>
          <div className="flex flex-col items-start">
            <AlertDialogTitle className="flex items-center justify-center gap-2">
              <div className="mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
                <LogOut className="text-primary" size={14} />
              </div>
              <p className="font-jakarta text-xl font-medium leading-6 text-title dark:text-gray-100">
                Confirm log out
              </p>
            </AlertDialogTitle>
            <p className="mt-2 text-[13px] text-gray-500">
              Are you sure you want to log out? You will be signed out of your
              account, and any unsaved changes may be lost.
            </p>
          </div>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <FormButton
              text="Logout"
              loadingText="Logging out"
              loading={false}
              className="!mt-0"
              onClick={handleConfirm}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserButton;
