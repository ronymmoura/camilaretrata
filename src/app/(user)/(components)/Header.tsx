"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { cn } from "@/lib/util";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="justify-center flex w-full pb-5 bg-white">
        <ul className="hidden gap-y-5 justify-center md:flex text-accent font-light flex-row items-end uppercase text-xl gap-x-10">
          <li className="pb-5 w-[145px] text-center">
            <Link href="/about" className="border-transparent border-b hover:border-accent p-1 transition-all duration-200">
              Sobre
            </Link>
          </li>
          <li className="pb-5 w-[145px] text-center">
            <Link href="/portfolio" className="border-transparent border-b hover:border-accent p-1 transition-all duration-200">
              Portfólio
            </Link>
          </li>
          <li className="">
            <Link href="/">
              <img
                className="h-24 hover:scale-105 transition-all duration-200"
                src="/camila_retrata_logo.png"
                alt="Camila Retrata"
              />
            </Link>
          </li>
          <li className="pb-5 w-[145px] text-center">
            <Link href="/testimonials" className="border-transparent border-b hover:border-accent p-1 transition-all duration-200">
              Depoimentos
            </Link>
          </li>
          <li className="pb-5 w-[145px] text-center">
            <Link href="/contact" className="border-transparent border-b hover:border-accent p-1 transition-all duration-200">
              Contato
            </Link>
          </li>
        </ul>

        <div className="md:hidden relative">
          <Link href="/">
            <img
              className="h-24"
              src="/camila_retrata_logo.png"
              alt="Camila Retrata"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        <button 
          className={cn(
            "drop-shadow-md bg-white rounded-full p-3 transition-all text-accent",
            isMenuOpen && "bg-accent text-white"
          )}
          onClick={() => setIsMenuOpen(old => !old)}
        >
          {!isMenuOpen && <FaBars size={24} className="drop-shadow-md" />}
          {isMenuOpen && <FaXmark size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
          "md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={cn(
            "bg-white h-full w-80 max-w-[90vw] ml-auto transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-center items-center h-full text-center uppercase text-2xl font-light text-accent space-y-8">
            <Link 
              href="/about" 
              className="hover:text-opacity-70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              href="/portfolio" 
              className="hover:text-opacity-70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfólio
            </Link>
            <Link 
              href="/testimonials" 
              className="hover:text-opacity-70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-opacity-70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
