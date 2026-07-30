import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03050d] border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-garimpo-gold flex items-center justify-center font-bold text-black text-sm">
              G
            </div>
            <span className="font-bold text-white text-base">GARIMPO F.C.</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            União, determinação e compromisso com o esporte. O Garimpo Futebol Clube representa nossa paixão pelo futebol.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">Acesso Rápido</h4>
          <ul className="space-y-2">
            <li><Link to="/o-clube" className="hover:text-garimpo-gold transition-colors">O Clube</Link></li>
            <li><Link to="/noticias" className="hover:text-garimpo-gold transition-colors">Notícias</Link></li>
            <li><Link to="/jogos" className="hover:text-garimpo-gold transition-colors">Calendário de Partidas</Link></li>
            <li><Link to="/elenco" className="hover:text-garimpo-gold transition-colors">Nosso Elenco</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">Transparência</h4>
          <ul className="space-y-2">
            <li><Link to="/o-clube#documentos" className="hover:text-garimpo-gold transition-colors">Estatuto Oficial</Link></li>
            <li><Link to="/o-clube#documentos" className="hover:text-garimpo-gold transition-colors">Balancetes</Link></li>
            <li><Link to="/contato" className="hover:text-garimpo-gold transition-colors">Fale Conosco</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">Redes Sociais</h4>
          <p className="text-xs text-gray-400 mb-3">Siga o Garimpo F.C. e fique por dentro das atualizações:</p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-garimpo-gold" aria-label="Instagram">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-garimpo-gold" aria-label="YouTube">YouTube</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Garimpo Futebol Clube. Todos os direitos reservados.
      </div>
    </footer>
  );
};
