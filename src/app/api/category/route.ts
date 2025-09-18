import { prisma } from "@/lib/db/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET all categories for public view
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        essays: {
          include: {
            photos: {
              where: {
                isMainPhoto: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: categories,
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

// Update category information (for studio)
export async function POST(request: NextRequest) {
  try {
    const category: Category = await request.json();

    const newCategory = await prisma.category.updateMany({
      where: {
        slug: category.slug,
      },
      data: {
        name: category.name,
        order: category.order,
        desktopImageUrl: category.desktopImageUrl,
        mobileImageUrl: category.mobileImageUrl,
      },
    });

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: newCategory,
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
