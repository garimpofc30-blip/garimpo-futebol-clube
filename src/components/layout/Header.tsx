import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Início', path: '/' },
    { label: 'O Clube', path: '/o-clube' },
    { label: 'Notícias', path: '/noticias' },
    { label: 'Jogos', path: '/jogos' },
    { label: 'Elenco', path: '/elenco' },
    { label: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#050814]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-garimpo-gold rounded-lg p-1">
          <div className="w-10 h-10 rounded-full bg-garimpo-gold flex items-center justify-center font-black text-black text-xl shadow-lg shadow-garimpo-gold/20">
            G
          </div>
          <span className="font-bold text-lg text-white tracking-wide uppercase">
            Garimpo <span className="text-garimpo-gold">F.C.</span>
          </span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação Principal">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-white/10 text-garimpo-gold font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botão do Menu Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-garimpo-gold"
          aria-expanded={menuOpen}
          aria-label="Abrir menu de navegação"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Dropped */}
      {menuOpen && (
        <div className="md:hidden bg-garimpo-navy border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium ${
                isActive(link.path) ? 'bg-garimpo-gold/10 text-garimpo-gold font-bold' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
