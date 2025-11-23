import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre - Camila Retrata",
  description: "Conheça a história e a paixão por trás da fotografia da Camila Retrata. Especializada em retratos, casamentos e eventos especiais.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src="/about.jpg"
          alt="Camila Retrata"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Sobre
            </h1>
            <div className="w-20 h-0.5 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-light text-accent mb-6">
                Olá, eu sou a Camila
              </h2>
              <div className="space-y-4 text-accent/80 leading-relaxed">
                <p>
                  Sou apaixonada por capturar momentos únicos e transformá-los em memórias eternas. 
                  Há mais de 8 anos venho desenvolvendo meu olhar artístico e técnico para oferecer 
                  fotografias que contam histórias verdadeiras.
                </p>
                <p>
                  Acredito que cada pessoa tem sua beleza única e meu trabalho é revelá-la através 
                  das lentes, criando imagens que tocam o coração e despertam emoções.
                </p>
                <p>
                  Especializo-me em retratos, casamentos e eventos especiais, sempre buscando 
                  capturar a essência e autenticidade de cada momento.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="/about.jpg"
                  alt="Camila Retrata - Fotógrafa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-accent text-center mb-12">
              Meus Serviços
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent">📸</span>
                </div>
                <h3 className="text-xl font-medium text-accent mb-3">Retratos</h3>
                <p className="text-accent/70">
                  Retratos individuais, familiares e corporativos que revelam a personalidade única de cada pessoa.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent">🎉</span>
                </div>
                <h3 className="text-xl font-medium text-accent mb-3">Eventos</h3>
                <p className="text-accent/70">
                  Cobertura de eventos especiais, aniversários e celebrações importantes.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-white rounded-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-light text-accent text-center mb-8">
              Minha Filosofia
            </h2>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-accent/80 leading-relaxed mb-6">
                &quot;Acredito que a fotografia vai muito além de apenas capturar imagens. 
                É sobre criar conexões, preservar emoções e contar histórias que durarão para sempre.&quot;
              </p>
              <p className="text-accent/70">
                Cada sessão é única e personalizada, sempre respeitando o estilo e personalidade 
                dos meus clientes. Meu objetivo é que vocês se sintam confortáveis e naturais, 
                permitindo que sua verdadeira essência brilhe através das fotografias.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-light text-accent mb-6">
              Vamos criar memórias juntos?
            </h2>
            <p className="text-accent/70 mb-8 max-w-2xl mx-auto">
              Entre em contato para conversarmos sobre seu projeto fotográfico. 
              Será um prazer ajudar a contar sua história através das lentes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 uppercase tracking-wider text-lg"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
