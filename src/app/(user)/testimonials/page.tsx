import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Depoimentos - Camila Retrata",
  description: "Veja o que nossos clientes dizem sobre os trabalhos da Camila Retrata. Depoimentos reais de casamentos, retratos e eventos especiais.",
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  
  const essaysWithFeedback = await prisma.essay.findMany({
    where: {
      feedback: {
        not: undefined,
      },
    },
    include: {
      category: true,
      photos: {
        where: {
          isMainPhoto: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-accent mb-4">
              Depoimentos
            </h1>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6"></div>
            <p className="text-xl text-accent/80 max-w-3xl mx-auto">
              A opinião dos nossos clientes é o que mais nos motiva. 
              Cada depoimento representa momentos especiais que tivemos o privilégio de capturar.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        {essaysWithFeedback.length > 0 ? (
          <div className="space-y-16 max-w-4xl mx-auto">
            {essaysWithFeedback.map((essay, index) => (
              <div
                key={essay.id}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Photo */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    {essay.photos[0] && (
                      <Image
                        src={essay.photos[0].url}
                        alt={essay.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-light text-accent mb-2">
                      {essay.name}
                    </h3>
                    <p className="text-accent/60 text-sm uppercase tracking-wider">
                      {essay.category.name} • {new Date(essay.date).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <blockquote className="text-lg text-accent/80 italic leading-relaxed">
                    &quot;{essay.feedback}&quot;
                  </blockquote>

                  <Link
                    href={`/portfolio/${essay.category.slug}/${essay.slug}`}
                    className="inline-flex items-center text-accent hover:text-accent/70 transition-colors"
                  >
                    Ver ensaio completo →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-light text-accent mb-4">
              Em breve
            </h2>
            <p className="text-accent/60 mb-8">
              Novos depoimentos serão adicionados em breve.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 uppercase tracking-wider"
            >
              Seja o Primeiro
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-light text-accent mb-6">
              Quer fazer parte desta galeria?
            </h2>
            <p className="text-accent/70 mb-8">
              Entre em contato e vamos criar juntos momentos especiais 
              que você também poderá compartilhar com o mundo.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 uppercase tracking-wider text-lg"
            >
              Agendar Sessão
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}