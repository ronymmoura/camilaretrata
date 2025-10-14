import { prisma } from "@/lib/db/prisma";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

interface EssayPageProps {
  params: Promise<{
    category: string;
    essay: string;
  }>;
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { essay: essaySlug, category: categorySlug } = await params;

  const essay = await prisma.essay.findFirst({
    where: { 
      slug: essaySlug,
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
    },
  });

  if (!essay) {
    return {
      title: "Ensaio não encontrado",
    };
  }

  return {
    title: `${essay.name} - ${essay.category.name} - Camila Retrata`,
    description: essay.feedback || `Veja as fotos do ensaio ${essay.name} na categoria ${essay.category.name}`,
  };
}

export const revalidate = 60;

export default async function EssayPage({ params }: EssayPageProps) {
  const { essay: essaySlug, category: categorySlug } = await params;
  
  const essay = await prisma.essay.findFirst({
    where: {
      slug: essaySlug,
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
      photos: {
        orderBy: [
          { isMainPhoto: "desc" }, // Main photo first
          { id: "asc" }, // Then by creation order
        ],
      },
    },
  });

  if (!essay) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-accent/70 mb-8">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/portfolio" className="hover:text-accent">
              Portfólio
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/portfolio/${essay.category.slug}`} className="hover:text-accent">
              {essay.category.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent font-medium">{essay.name}</span>
          </nav>

          {/* Essay Header */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-light text-accent mb-4">
              {essay.name}
            </h1>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6"></div>
            <p className="text-accent/70 mb-2">
              {new Date(essay.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-accent/60 text-sm uppercase tracking-wider">
              {essay.category.name}
            </p>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="container mx-auto px-4 py-16">
        {essay.photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {essay.photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`
                  relative group overflow-hidden rounded-lg 
                  ${photo.isMainPhoto ? "md:col-span-2 md:row-span-2" : "aspect-square"} 
                  ${index === 0 && photo.isMainPhoto ? "aspect-[4/3]" : "aspect-square"}
                `}
              >
                {photo.type === "IMAGE" ? (
                  <Image
                    src={photo.url}
                    alt={`${essay.name} - Foto ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                    sizes={
                      photo.isMainPhoto
                        ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    priority={index < 3}
                  />
                ) : (
                  <video
                    src={photo.url}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-accent/60">
              Nenhuma foto disponível para este ensaio.
            </p>
          </div>
        )}
      </div>

      {/* Client Feedback */}
      {essay.feedback && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-light text-accent mb-8">
                Depoimento
              </h2>
              <blockquote className="text-lg md:text-xl text-accent/80 italic leading-relaxed">
                {"\""}{essay.feedback}{"\""}
              </blockquote>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <Link
              href={`/portfolio/${essay.category.slug}`}
              className="inline-flex items-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 uppercase tracking-wider"
            >
              ← Voltar para {essay.category.name}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 uppercase tracking-wider"
            >
              Agendar Sessão
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}