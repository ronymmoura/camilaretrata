import { prisma } from "@/lib/db/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface CategoryApiParams {
  params: Promise<{
    category: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: CategoryApiParams) {
  const { category: categorySlug } = await params;

  try {
    const category: Category = await request.json();

    const result = await prisma.category.updateMany({
      where: {
        slug: categorySlug,
      },
      data: {
        name: category.name,
        order: category.order,
        desktopImageUrl: category.desktopImageUrl,
        mobileImageUrl: category.mobileImageUrl,
      },
    });

    if (result.count === 0) {
      throw new Error(`Category ${categorySlug} not found`);
    }

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: result,
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
