"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Assunto é obrigatório"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await api.post("/api/email", data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <h2 className="text-2xl font-light text-accent mb-4">
            Mensagem Enviada!
          </h2>
          <p className="text-accent/70 mb-6">
            Obrigada pelo seu contato! Responderei em breve.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center px-6 py-3 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 uppercase tracking-wider"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-accent mb-4">
              Contato
            </h1>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-6"></div>
            <p className="text-xl text-accent/80 max-w-2xl mx-auto">
              Vamos conversar sobre seu projeto fotográfico. Será um prazer ajudar a contar sua história.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-light text-accent mb-6">
              Envie sua Mensagem
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="(83) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Tipo de Evento
                  </label>
                  <select
                    {...register("eventType")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="retrato">Retrato</option>
                    <option value="casamento">Casamento</option>
                    <option value="evento">Evento</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent mb-2">
                  Data do Evento (se aplicável)
                </label>
                <input
                  type="date"
                  {...register("eventDate")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent mb-2">
                  Assunto *
                </label>
                <input
                  type="text"
                  {...register("subject")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Assunto da sua mensagem"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-accent mb-2">
                  Mensagem *
                </label>
                <textarea
                  {...register("message")}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-vertical"
                  placeholder="Conte-me mais sobre seu projeto, suas expectativas e qualquer detalhe importante..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-4 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-300 uppercase tracking-wider font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light text-accent mb-6">
                Outras Formas de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-accent mb-1">Email</h3>
                    <p className="text-accent/70">contato@camilaretrata.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent">📱</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-accent mb-1">WhatsApp</h3>
                    <p className="text-accent/70">(83) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent">📍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-accent mb-1">Localização</h3>
                    <p className="text-accent/70">João Pessoa, PB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-light text-accent mb-4">
                Tempo de Resposta
              </h3>
              <p className="text-accent/70 leading-relaxed">
                Respondo todas as mensagens em até 24 horas. Para urgências, 
                entre em contato via WhatsApp.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-light text-accent mb-4">
                Orçamentos
              </h3>
              <p className="text-accent/70 leading-relaxed">
                Todos os orçamentos são personalizados e gratuitos. 
                Informe o máximo de detalhes sobre seu evento para 
                uma proposta mais precisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}