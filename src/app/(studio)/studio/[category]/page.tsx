import { FaPlus } from "react-icons/fa6";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/util";
import { prisma } from "@/lib/db/prisma";

interface CategoryPageParams {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 0;

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category } = await params;
  
  const essays = await prisma.essay.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      photos: true,
    },
  });

  return (
    <div className="flex flex-wrap gap-3 p-4">
      <Link
        href={`/studio/${category}/new`}
        className="flex h-[330px] w-[250px] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-zinc-600 transition-colors hover:bg-zinc-800"
      >
        <FaPlus size={24} />
      </Link>

      {essays.map((essay) => (
        <Link
          key={essay.id}
          href={`/studio/${category}/${essay.id}`}
          className="group relative w-[250px] overflow-hidden rounded-md"
        >
          <Image
            src={essay.photos.find((x) => x.isMainPhoto)?.url as string}
            alt={essay.name}
            width={250}
            height={330}
            className={cn(
              "h-auto w-auto object-cover transition-all group-hover:scale-105",
              "aspect-[3/4]",
            )}
            sizes="100vw"
          />

          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100">
            {essay.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
