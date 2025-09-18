"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/Button";
import { FaFloppyDisk } from "react-icons/fa6";
import { Input } from "../../components/Input";
import { Category } from "@prisma/client";
import { api } from "@/lib/api";
import { Form } from "../../components/Form";

const formSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  order: z
    .number()
    .refine((val) => val > 0, "Campo obrigatório ou deve ser maior que zero"),
  desktopImageUrl: z.string().optional(),
  mobileImageUrl: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  category: Category;
}

export default function EditForm({ category }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    resetOptions: { keepErrors: false },
    defaultValues: {
      name: category.name,
      order: category.order,
      desktopImageUrl: category.desktopImageUrl ?? undefined,
      mobileImageUrl: category.mobileImageUrl ?? undefined,
    },
  });

  async function handleSave(data: FormData) {
    try {
      await api.put(`/api/category/${category.slug}`, data);
    } catch (e: any) {
      form.setError("root", {
        type: "manual",
        message: e.response.data.message,
      });
    }
  }

  return (
    <FormProvider {...form}>
      <Form.Root onSubmit={form.handleSubmit(handleSave)} className="w-full max-w-lg p-8">
        <Input.Root>
          <Input.Label htmlFor="name">Nome:</Input.Label>
          <Input.Text {...form.register("name")} />
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="order">Ordem:</Input.Label>
          <Input.Text type="number" {...form.register("order")} />
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="order">Imagem Desktop:</Input.Label>
          <Input.MediaPicker
            {...form.register("desktopImageUrl")}
            accept="image/*"
            canCrop
            aspectRatio={16 / 9}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="order">Imagem Mobile:</Input.Label>
          <Input.MediaPicker
            {...form.register("mobileImageUrl")}
            className="aspect-[9/16] w-[250px]"
            accept="image/*"
            canCrop
            aspectRatio={9 / 16}
          />
        </Input.Root>

        <Form.Error />

        <div>
          <Button.Root type="submit" variant="success">
            <Button.Icon>
              <FaFloppyDisk />
            </Button.Icon>

            <Button.Content>Salvar</Button.Content>
          </Button.Root>
        </div>
      </Form.Root>
    </FormProvider>
  );
}
