import { FaPencil } from "react-icons/fa6";
import { Button } from "../components/Button";
import { ReactNode } from "react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

interface CategoryPageParams {
  params: {
    category: string;
  };
  children: ReactNode;
}

export default async function Layout({ children, params: { category } }: CategoryPageParams) {
  const cat = await prisma.category.findFirstOrThrow({
    where: { slug: category },
  });

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="inline-flex items-end space-x-3 p-8">
        <h2 className="text-4xl">{cat.name}</h2>

        <Link href={`/studio/${category}/edit`}>
          <Button.Root variant="ghost" size="sm">
            <Button.Icon>
              <FaPencil />
            </Button.Icon>

            <Button.Content>Editar</Button.Content>
          </Button.Root>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-5 overflow-y-auto border-t border-zinc-600">{children}</div>
    </div>
  );
}
