import { prisma } from "@/lib/db/prisma";
import Form from "./Form";

export const revalidate = 0;

interface CategoryPageParams {
  params: Promise<{
    category: string;
  }>;
}

export default async function Edit({ params }: CategoryPageParams) {
  const { category } = await params;
  
  const cat = await prisma.category.findFirstOrThrow({
    where: { slug: category },
  });

  return <Form category={cat} />;
}
