import Download from '@src/icons/download';
import { Paperclip } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from './button';
import { FormItem, FormLabel } from './form';

export interface UploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const FormUpload = ({ name, label }: UploadProps) => {
  const { control, setValue, watch } = useFormContext();
  const filename = watch(name)?.name || '';
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, acceptedFiles[0], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue, name]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        /* eslint-disable react-hooks/rules-of-hooks */
        const { getRootProps, getInputProps } = useDropzone({
          onDrop,
          accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
          },
          maxFiles: 1,
          maxSize: 1024 * 1024 * 2, // 2MB
        });

        return (
          <FormItem className="space-y-0">
            <FormLabel className="text-sm font-medium text-title">
              {label}
            </FormLabel>
            {filename ? (
              <p className="flex w-full items-center gap-2 rounded-md border border-dashed border-[#ABA7AF] p-4 text-sm text-black">
                <Paperclip size={12} />
                {filename}
              </p>
            ) : (
              <div
                className="flex h-full max-h-[200px] w-full cursor-pointer flex-col items-center justify-start gap-2 rounded border border-dashed border-[#ABA7AF] bg-transparent px-[20px] py-[12px] text-black hover:border-black hover:bg-transparent hover:text-black disabled:bg-[#F4F7FA]"
                {...getRootProps()}
              >
                <Download />
                <small className="text-sm text-title">
                  Drag here or click the button below to upload
                </small>
                <Button type="button">
                  <Paperclip />
                  <span>Choose File</span>
                </Button>
                <span className="text-[#4B3A5A]">
                  Maximum upload size: 2MB (.jpeg)
                </span>
                <input
                  id={name}
                  type="file"
                  hidden
                  accept="image/jpeg"
                  {...getInputProps({ onChange })}
                />
              </div>
            )}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </FormItem>
        );
      }}
    />
  );
};

FormUpload.displayName = 'FormUpload';

export { FormUpload };
