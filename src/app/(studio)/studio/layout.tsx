import { Inter, Titillium_Web as Titillium } from "next/font/google";
import { ReactNode } from "react";

import { Sidebar } from "@/studio/components";
import { prisma } from "@/prisma";

import "@/styles";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tt = Titillium({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-titillium",
});

export const metadata = {
  title: "Camila Retrata",
  description: "Camila Retrata",
  viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const categories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${tt.variable} flex h-screen bg-zinc-900 font-inter antialiased text-white`}
      >
        <div className="flex w-full">
          <Sidebar categories={categories} className="hidden w-[300px] min-w-[300px] lg:block" />

          <div className="flex-auto border-zinc-700 lg:border-l">{children}</div>
        </div>
      </body>
    </html>
  );
}
