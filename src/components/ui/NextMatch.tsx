import Link from "next/link";
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b-2 border-brand-gold/40">
      {/* Imagem do Estádio no Fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/estadio.jpg"
          alt="Estádio Garimpo F.C."
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Overlays de gradiente para dar tom profissional e legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navyDark via-brand-navyDark/60 to-brand-navyDark/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#050814_100%)]" />
      </div>

      {/* Conteúdo Central do Hero */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/80 border border-brand-gold/50 backdrop-blur-md mb-6 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
          <span className="text-xs font-bold text-brand-gold tracking-widest uppercase">
            Temporada Oficial 2026
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-display drop-shadow-2xl uppercase">
          A Raça e o Orgulho do <br />
          <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-goldHover bg-clip-text text-transparent">
            Garimpo F.C.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          União, trabalho árduo e paixão pelo futebol. Acompanhe nossos jogos, apoie o elenco e vista o manto oficial.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/loja"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldHover text-brand-navyDark font-bold text-base shadow-xl shadow-brand-gold/20 hover:scale-105 transition-all duration-300 tracking-wider uppercase text-center"
          >
            Seja Sócio / Compre o Manto
          </Link>

          <Link
            href="/jogos"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy/80 text-white font-semibold text-base border border-white/20 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 backdrop-blur-md tracking-wider uppercase text-center"
          >
            Ver Calendário de Jogos
          </Link>
        </div>
      </div>
    </section>
  );
}
