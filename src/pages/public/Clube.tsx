import React from 'react';

export const Clube: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase">Sobre o Garimpo F.C.</h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Conheça a história e os valores morais que fundamentam a fundação do nosso clube.
        </p>
      </div>

      {/* História */}
      <section className="bg-garimpo-navy border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-garimpo-gold">Nossa História</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Fundado com o objetivo de integrar a comunidade através da prática esportiva, o Garimpo Futebol Clube nasceu da união de atletas e torcedores comprometidos em construir um projeto esportivo sólido, pautado pelo respeito, disciplina e ética esportiva.
        </p>
      </section>

      {/* Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-garimpo-navy border border-white/10 rounded-xl p-6 space-y-2">
          <h3 className="text-lg font-bold text-white">🎯 Missão</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Promover a prática do futebol amador com responsabilidade, inspirando atletas e formando cidadãos dentro e fora dos gramados.
          </p>
        </div>
        <div className="bg-garimpo-navy border border-white/10 rounded-xl p-6 space-y-2">
          <h3 className="text-lg font-bold text-white">👁️ Visão</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Ser referência regional em organização esportiva, gestão transparente e engajamento com a comunidade torcedora.
          </p>
        </div>
        <div className="bg-garimpo-navy border border-white/10 rounded-xl p-6 space-y-2">
          <h3 className="text-lg font-bold text-white">⭐ Valores</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Respeito às regras, integridade, trabalho em equipe, transparência e amor incondicional ao esporte.
          </p>
        </div>
      </div>

      {/* Quadro Diretivo (Estruturado para dados futuros) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">Diretoria Executiva</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-garimpo-navy border border-white/5 rounded-xl p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-garimpo-gold/20 text-garimpo-gold font-bold text-xl flex items-center justify-center mx-auto mb-3">
              PRES
            </div>
            <h4 className="text-sm font-bold text-white">Presidência</h4>
            <p className="text-xs text-gray-400 mt-1">Garimpo F.C.</p>
          </div>
          <div className="bg-garimpo-navy border border-white/5 rounded-xl p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-garimpo-gold/20 text-garimpo-gold font-bold text-xl flex items-center justify-center mx-auto mb-3">
              DIR
            </div>
            <h4 className="text-sm font-bold text-white">Diretoria de Futebol</h4>
            <p className="text-xs text-gray-400 mt-1">Garimpo F.C.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
