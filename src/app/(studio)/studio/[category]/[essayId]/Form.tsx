"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/Button";
import { FaFloppyDisk, FaTrash } from "react-icons/fa6";
import { Input } from "../../components/Input";
import { cn } from "@/lib/util";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { EssayWithPhotos } from "./page";

const photosSchema = z.object({
  url: z.string().nonempty("Campo obrigatório"),
  isMainPhoto: z.boolean(),
  type: z.enum(["IMAGE", "VIDEO"]),
});

const formSchema = z.object({
  name: z.string().nonempty("Campo obrigatório"),
  date: z.date().optional(),
  feedback: z.string().optional(),
  photos: z.array(photosSchema),
});

type PhotosData = z.infer<typeof photosSchema>;
type FormData = z.infer<typeof formSchema>;

export function Form({ category, essay }: { category: string; essay: EssayWithPhotos | null }) {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: essay?.name ?? "",
      date: essay?.date ?? new Date(),
      feedback: essay?.feedback ?? "",
      photos:
        essay?.photos.map((photo: PhotosData) => ({
          url: photo.url,
          isMainPhoto: photo.isMainPhoto,
          type: photo.type,
        })) ?? undefined,
    },
  });

  const photosList = form.watch("photos");

  async function handleSave(data: FormData) {
    console.log(data);
    try {
      const url = essay?.id
        ? `/api/category/${category}/essay/${essay?.id}`
        : `/api/category/${category}/essay`;

      await api[essay?.id ? "put" : "post"](url, {
        ...data,
      });
      router.replace(`/studio/${category}`);
    } catch (e: any) {
      form.setError("root", {
        type: "manual",
        message: e.response.data.message,
      });
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/api/category/${category}/essay/${essay?.id}`);
      router.replace(`/studio/${category}`);
    } catch (e: any) {
      form.setError("root", {
        type: "manual",
        message: e.response.data.message,
      });
    }
  }

  async function handleDeletePhoto(photo: PhotosData) {
    if (!photo.isMainPhoto) {
      form.setValue("photos", [...photosList.filter((x) => x !== photo)]);
      return;
    }

    const newList = photosList
      .filter((x) => x !== photo)
      .reduce((list: PhotosData[], current: PhotosData) => {
        if (list.length === 0) {
          current.isMainPhoto = true;
        } else {
          current.isMainPhoto = false;
        }

        list.push(current);

        return list;
      }, []);

    form.setValue("photos", newList);
  }

  async function handleSetMainPhoto(photo: PhotosData) {
    const newList = photosList.reduce((list: PhotosData[], current: PhotosData) => {
      if (current === photo) {
        current.isMainPhoto = true;
      } else {
        current.isMainPhoto = false;
      }

      list.push(current);

      return list;
    }, []);

    form.setValue("photos", newList);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex h-full">
        <div className="w-[400px] space-y-5 p-8">
          <Input.Root>
            <Input.Label htmlFor="name">Nome:</Input.Label>
            <Input.Text {...form.register("name")} />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="date">Data:</Input.Label>
            <Input.DatePicker {...form.register("date")} />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="feedback">Depoimento:</Input.Label>
            <Input.Textarea rows={6} {...form.register("feedback")} />
          </Input.Root>

          <div className="space-x-3">
            <Button.Root type="submit" variant="success">
              <Button.Icon>
                <FaFloppyDisk />
              </Button.Icon>

              <Button.Content>Salvar</Button.Content>
            </Button.Root>

            {essay?.id && (
              <Button.Root variant="danger" onClick={handleDelete}>
                <Button.Icon>
                  <FaTrash />
                </Button.Icon>

                <Button.Content>Deletar</Button.Content>
              </Button.Root>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-wrap gap-3 border-l border-zinc-600 p-4">
          <Input.MultipleMediaPicker
            {...form.register("photos")}
            className="h-[330px] w-[250px]"
            accept="video/*,image/*"
          />

          {photosList?.map((photo, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative h-[330px] overflow-hidden rounded-md border-2 border-zinc-900",
                photo.isMainPhoto && "border-emerald-400",
              )}
            >
              {photo.type === "IMAGE" && (
                <>
                  <img
                    src={photo.url}
                    alt={""}
                    width={250}
                    height={330}
                    className={cn(
                      "h-[330px] w-auto rounded-md object-cover transition-all",
                      "aspect-[3/4]",
                    )}
                    sizes="100vw"
                  />
                </>
              )}

              {photo.type === "VIDEO" && (
                <>
                  <video controls width="250">
                    <source src={photo.url} type="video/mp4" />
                  </video>
                </>
              )}

              <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center space-y-3 bg-black bg-opacity-60 p-10 text-white opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
                {!photo.isMainPhoto && (
                  <Button.Root
                    variant="default"
                    className="w-full"
                    onClick={() => handleSetMainPhoto(photo)}
                  >
                    <Button.Icon>
                      <FaTrash />
                    </Button.Icon>
                    <Button.Content>Imagem Principal</Button.Content>
                  </Button.Root>
                )}

                <Button.Root
                  variant="danger"
                  className="w-full"
                  onClick={() => handleDeletePhoto(photo)}
                >
                  <Button.Icon>
                    <FaTrash />
                  </Button.Icon>
                  <Button.Content>Excluir</Button.Content>
                </Button.Root>
              </div>
            </div>
          ))}
        </div>
      </form>
    </FormProvider>
  );
}
