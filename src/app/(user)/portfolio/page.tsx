import { prisma } from "@/lib/db/prisma";

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio - Camila Retrata",
  description: "Explore o portfólio de fotografia da Camila Retrata, com retratos, casamentos e eventos especiais.",
};

export const revalidate = 60; // Revalidate every minute

export default async function PortfolioPage() {
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
        orderBy: {
          date: "desc",
        },
        take: 4, // Show only 4 recent essays per category
      },
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-accent mb-4">
              Portfólio
            </h1>
            <p className="text-xl text-accent/80 max-w-2xl mx-auto">
              Cada imagem conta uma história única, capturada com sensibilidade e arte
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-20">
          {categories.map((category) => (
            <section key={category.id} className="space-y-8">
              {/* Category Header */}
              <div className="text-center">
                <Link 
                  href={`/portfolio/${category.slug}`}
                  className="group inline-block"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-accent mb-2 group-hover:text-accent/80 transition-colors">
                    {category.name}
                  </h2>
                  <div className="w-20 h-0.5 bg-accent mx-auto group-hover:w-32 transition-all duration-300"></div>
                </Link>
              </div>

              {/* Category Description or Recent Essays */}
              {category.essays.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.essays.map((essay) => (
                    <Link
                      key={essay.id}
                      href={`/portfolio/${category.slug}/${essay.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        {essay.photos[0] && (
                          <img
                            src={essay.photos[0].url}
                            alt={essay.name}
                            // fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 h-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-lg font-medium">
                            {essay.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-accent/60">
                    Em breve, novos trabalhos desta categoria
                  </p>
                </div>
              )}

              {/* View All Link */}
              {category.essays.length > 0 && (
                <div className="text-center">
                  <Link
                    href={`/portfolio/${category.slug}`}
                    className="inline-flex items-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 uppercase tracking-wider"
                  >
                    Ver todos os trabalhos
                  </Link>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}