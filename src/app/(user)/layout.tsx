import { ReactNode } from "react";
import { Poppins, Moderustic } from "next/font/google";
import { Metadata } from "next";
import Header from "./(components)/Header";

import "@/styles";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "300", "400", "500"],
});

const tt = Moderustic({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-moderustic",
});

export const metadata: Metadata = {
  title: "Camila Retrata",
  description: "Camila Retrata",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} ${tt.variable} font-sans`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
