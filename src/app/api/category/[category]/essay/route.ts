import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

interface EssayPostParams {
  params: Promise<{
    category: string;
  }>;
}

export async function POST(request: NextRequest, { params }: EssayPostParams) {
  const { category: categorySlug } = await params;

  try {
    const essay = await request.json();

    const category = await prisma.category.findFirstOrThrow({
      where: { slug: categorySlug },
    });

    const newEssay = await prisma.essay.create({
      data: {
        name: essay.name,
        date: essay.date,
        feedback: essay.feedback,
        slug: slugify(essay.name),
        categoryId: category.id,
      },
    });

    await prisma.photo.createMany({
      data: essay.photos.map((photo: any) => ({
        url: photo.url,
        isMainPhoto: photo.isMainPhoto,
        type: photo.type,
        essayId: newEssay.id,
      })),
    });

    revalidatePath("/");

    return NextResponse.json({
      success: true,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 500,
      },
    );
  }
}
