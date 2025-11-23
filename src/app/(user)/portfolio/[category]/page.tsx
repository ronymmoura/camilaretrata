import { prisma } from "@/lib/db/prisma";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;

  const category = await prisma.category.findFirst({
    where: { slug: categorySlug },
  });

  if (!category) {
    return {
      title: "Categoria não encontrada",
    };
  }

  return {
    title: `${category.name} - Camila Retrata`,
    description: `Explore os trabalhos de ${category.name.toLowerCase()} da Camila Retrata`,
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
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
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Category Image */}
      <div className="relative h-64 md:h-96 bg-gray-900">
        {category.desktopImageUrl && (
          <>
            <Image
              src={category.desktopImageUrl}
              alt={category.name}
              fill
              className="object-cover opacity-60 hidden md:block"
              priority
            />
            {category.mobileImageUrl && (
              <Image
                src={category.mobileImageUrl}
                alt={category.name}
                fill
                className="object-cover opacity-60 block md:hidden"
                priority
              />
            )}
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              {category.name}
            </h1>
            <div className="w-20 h-0.5 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-accent/70">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/portfolio" className="hover:text-accent">
              Portfólio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Essays Grid */}
      <div className="container mx-auto px-4 py-16">
        {category.essays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.essays.map((essay) => (
              <Link
                key={essay.id}
                href={`/portfolio/${category.slug}/${essay.slug}`}
                className="group block"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
                    {essay.photos[0] && (
                      <Image
                        src={essay.photos[0].url}
                        alt={essay.name}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105 h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-accent group-hover:text-accent/80 transition-colors">
                      {essay.name}
                    </h3>
                    <p className="text-sm text-accent/60 mt-1">
                      {new Date(essay.date).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-light text-accent mb-4">
              Em breve
            </h2>
            <p className="text-accent/60 mb-8">
              Novos trabalhos desta categoria serão adicionados em breve.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 uppercase tracking-wider"
            >
              Voltar ao Portfólio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}