import { prisma } from "@/lib/db/prisma";
import { Form } from "./Form";
import { Prisma } from "@prisma/client";

interface CategoryPageParams {
  params: {
    category: string;
    essayId: string;
  };
}

export const revalidate = 0;

export type EssayWithPhotos = Prisma.EssayGetPayload<{
  include: {
    photos: true;
  };
}>;

export default async function Edit({ params: { category, essayId } }: CategoryPageParams) {
  let essay: EssayWithPhotos | null;

  if (essayId === "new") {
    essay = null;
  } else {
    essay = await prisma.essay.findUnique({
      where: {
        id: +essayId,
      },
      include: {
        photos: {
          orderBy: {
            isMainPhoto: "desc",
          },
        },
      },
    });
  }

  return <Form category={category} essay={essay} />;
}
