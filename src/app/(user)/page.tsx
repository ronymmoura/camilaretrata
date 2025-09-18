"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black relative h-[calc(100vh-116px)]">
      <div className="z-1 h-full absolute w-full opacity-50 hidden md:block">
        <img
          className="h-full drop-shadow-md w-full"
          src="/home-bg.jpg"
          alt="Camila Retrata"
          // fill
          style={{ objectFit: "cover" }}
          // priority
        />
      </div>

      <div className="z-1 h-full absolute w-full opacity-50 block md:hidden">
        <img
          className="h-full drop-shadow-md w-full"
          src="/home-mobile-bg.jpg"
          alt="Camila Retrata"
          // fill
          style={{ objectFit: "cover" }}
          // priority
        />
      </div>

      <div className="z-2 relative flex justify-center items-center flex-col h-full">
        <div className="flex-1 items-center justify-center flex flex-col w-fit font-sans gap-y-15 text-white">
          <div className="text-2xl md:text-4xl font-light text-center px-4">
            <div className="">
              Capturando momentos especiais
            </div>
            <div className="">
              com arte e sensibilidade
            </div>
          </div>

          <Link
            href="/contact"
            className="uppercase border-2 px-9 py-2 bg-white/20 hover:bg-white/40 transition-all tracking-widest"
          >
            Entre em contato
          </Link>
        </div>
      </div>
    </div>
  );
}
