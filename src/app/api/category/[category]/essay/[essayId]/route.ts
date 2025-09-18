import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/util";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface EssayApiParams {
  params: Promise<{
    category: string;
    essayId: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: EssayApiParams,
) {
  const { category: categorySlug, essayId } = await params;

  try {
    const essay = await request.json();

    const category = await prisma.category.findFirstOrThrow({
      where: { slug: categorySlug },
    });

    const newEssay = await prisma.essay.update({
      where: {
        id: +essayId,
      },
      data: {
        name: essay.name,
        date: essay.date,
        feedback: essay.feedback,
        slug: slugify(essay.name),
        categoryId: category.id,
      },
    });

    await prisma.photo.deleteMany({
      where: {
        essayId: +essayId,
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

export async function DELETE(
  request: NextRequest,
  { params }: EssayApiParams,
) {
  const { essayId } = await params;
  
  try {
    await prisma.photo.deleteMany({
      where: {
        essayId: +essayId,
      },
    });

    await prisma.essay.delete({
      where: {
        id: +essayId,
      },
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
