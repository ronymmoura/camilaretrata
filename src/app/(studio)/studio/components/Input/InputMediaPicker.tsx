"use client";

import { storageUpload } from "@/lib/storage/local";
import { cn } from "@/lib/util";

import * as React from "react";
import { ChangeEvent, createRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { useFormContext } from "react-hook-form";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import uuid4 from "uuid4";
import { Button } from "../Button";
import "cropperjs/dist/cropper.css";
import { Dialog } from "../Dialog";

interface InputMediaPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  canCrop?: boolean;
  aspectRatio?: any;
}

const InputMediaPicker = React.forwardRef<HTMLInputElement, InputMediaPickerProps>(
  ({ className, name, aspectRatio, accept = "*/*", canCrop = false, ...props }, ref) => {
    const formContext = useFormContext();
    const [dragActive, setDragActive] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [image, setImage] = useState(null);
    const cropperRef = createRef<ReactCropperElement>();

    const value = formContext.watch(name!);

    if (!name) return null;

    async function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
      const { files } = e.target;

      if (!files) {
        return;
      }

      setUploadedFile(files[0]);

      if (canCrop) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
      } else {
        await prepareFile();
      }
    }

    function saveCropData() {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
          prepareFile(blob).then();
        }, uploadedFile.type);
      }
    }

    async function prepareFile(file?: any) {
      setIsLoading(true);

      if (!file) {
        file = uploadedFile;
      }

      const url = await storageUpload(`${uuid4()}.${uploadedFile.name.split(".").pop()}`, file);

      formContext.setValue(name!, url);
      setImage(null);
      setUploadedFile(null);

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
        await prepareFile(e.dataTransfer.files[0]);
      }
    }

    return (
      <>
        {(!value || isLoading) && (
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
        )}

        {value && !isLoading && (
          <label
            htmlFor={name}
            className={cn(
              "relative flex aspect-video cursor-pointer flex-col items-center justify-center space-y-5 overflow-hidden",
              "rounded-md border border-dashed border-zinc-600 text-center text-sm transition-colors ",
              "hover:bg-zinc-800",
              className,
            )}
          >
            <img
              src={value}
              alt=""
              // fill
              className="aspect-video w-full rounded-lg object-cover"
              sizes="100vw"
            />
          </label>
        )}

        <Dialog.Root open={!!image} onOpenChange={(open) => !open && setImage(null)}>
          <Dialog.Content>
            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                aspectRatio={aspectRatio}
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            )}

            <Dialog.Footer>
              <Button.Root onClick={saveCropData}>
                <Button.Content>Salvar</Button.Content>
              </Button.Root>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

        <input
          type="file"
          id={name}
          className="invisible absolute h-0 w-0"
          accept={accept}
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

InputMediaPicker.displayName = "MediaPicker";

export { InputMediaPicker };
