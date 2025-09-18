import { storageUpload } from "@/lib/storage/local";
import { cn } from "@/lib/util";
import * as React from "react";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import uuid4 from "uuid4";
//import uuid4 from "uuid4";

type InputMultipleMediaPickerProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputMultipleMediaPicker = React.forwardRef<HTMLInputElement, InputMultipleMediaPickerProps>(
  ({ className, name, accept = "*/*", ...props }, ref) => {
    const formContext = useFormContext();
    const [dragActive, setDragActive] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const value = formContext.watch(name!);

    if (!name) return null;

    async function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
      const { files } = e.target;

      if (!files) {
        return;
      }

      await uploadFiles(files);
    }

    async function uploadFiles(files: FileList) {
      setIsLoading(true);

      const newValue = [];

      for (const file of files) {
        const url = await storageUpload(`${uuid4()}.${file.name.split(".").pop()}`, file);

        const newItem: any = {
          url,
          isMainPhoto: !value && newValue.length === 0,
          type: file.type.startsWith("video") ? "VIDEO" : "IMAGE",
        };

        newValue.push(newItem);
      }

      !value
        ? formContext.setValue(name!, [...newValue])
        : formContext.setValue(name!, [...value, ...newValue]);

      setIsLoading(false);
    }

    // handle drag events
    function handleDrag(e: React.DragEvent<HTMLLabelElement>) {
      e.preventDefault();
      e.stopPropagation();

      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }

    // triggers w hen file is dropped
    async function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
      e.preventDefault();
      e.stopPropagation();

      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await uploadFiles(e.dataTransfer.files);
      }
    }

    return (
      <>
        <label
          htmlFor={name}
          className={cn(
            "flex aspect-video cursor-pointer flex-col items-center justify-center space-y-5 overflow-hidden",
            "rounded-md border border-dashed border-zinc-600 p-2 text-center text-sm transition-colors ",
            "hover:bg-zinc-800",
            dragActive && "bg-zinc-700",
            className,
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!isLoading && (
            <>
              <FaPlus size={24} />
              Clique ou arraste aqui para adicionar...
            </>
          )}

          {isLoading && (
            <>
              <FaSpinner className="animate-spin" size={24} />
              Carregando...
            </>
          )}
        </label>

        <input
          type="file"
          id={name}
          className="invisible absolute h-0 w-0"
          accept={accept}
          multiple={true}
          onChange={onFileSelected}
        />

        {formContext.formState?.errors?.[name] && (
          <div className="text-red-400">
            {formContext.formState?.errors?.[name]?.message?.toString()}
          </div>
        )}
      </>
    );
  },
);

InputMultipleMediaPicker.displayName = "MultipleMediaPicker";

export { InputMultipleMediaPicker };
