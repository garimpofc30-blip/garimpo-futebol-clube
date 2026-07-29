"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Shield } from "lucide-react";

const navigation = [
  { name: "Início", href: "/" },
  { name: "O Clube", href: "/clube" },
  { name: "Notícias", href: "/noticias" },
  { name: "Jogos", href: "/jogos" },
  { name: "Elenco", href: "/elenco" },
  { name: "Loja", href: "/loja" },
  { name: "Rifas", href: "/rifas" },
  { name: "Patrocinadores", href: "/patrocinadores" },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-navyDark/95 backdrop-blur-md border-b border-brand-gold/20 text-white">
      {/* Topbar rápida */}
      <div className="bg-brand-navy border-b border-white/5 py-1 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Garimpo Futebol Clube • Site Oficial</span>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-brand-gold transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" /> Painel Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Escudo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-goldHover rounded-full flex items-center justify-center font-bold text-brand-navyDark shadow-lg shadow-brand-gold/20 border-2 border-white/10 group-hover:scale-105 transition-transform">
              GFC
            </div>
            <div>
              <span className="block font-bold text-lg leading-none tracking-wider text-white">GARIMPO</span>
              <span className="text-xs tracking-widest text-brand-gold uppercase font-semibold">Futebol Clube</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-200 hover:text-brand-gold transition-colors tracking-wide py-2 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/loja"
              className="relative p-2 text-slate-200 hover:text-brand-gold transition-colors"
              aria-label="Carrinho da Loja"
            >
              <ShoppingBag className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-brand-gold focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy border-b border-brand-gold/20 px-4 pt-2 pb-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-brand-slate hover:text-brand-gold transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
