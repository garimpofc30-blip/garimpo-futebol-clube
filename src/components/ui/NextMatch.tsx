import { Match } from "@/types";

export function NextMatch({ match }: { match: Match }) {
  return (
    <section className="bg-gradient-to-r from-brand-navy via-brand-slate to-brand-navy border-y border-brand-gold/30 text-white py-12 px-4 shadow-2xl relative overflow-hidden">
      {/* Detalhe de iluminação esportiva */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/20 text-brand-gold font-semibold text-xs tracking-widest uppercase border border-brand-gold/40">
            {match.competition}
          </span>
          <p className="text-slate-400 text-sm mt-2">{match.stadium} • {match.date} às {match.time}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-brand-navyDark/60 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
          {/* Time Mandante */}
          <div className="flex items-center gap-4 flex-1 justify-center md:justify-end text-center md:text-right">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-wide">{match.homeTeam}</h3>
              <span className="text-xs text-brand-gold uppercase font-medium">Mandante</span>
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-navy flex items-center justify-center font-bold text-lg text-brand-gold border-2 border-brand-gold/40 shadow-lg">
              {match.homeTeam.substring(0, 3).toUpperCase()}
            </div>
          </div>

          {/* Placar / VS */}
          <div className="flex flex-col items-center justify-center px-6">
            <span className="text-3xl md:text-4xl font-extrabold text-brand-gold tracking-widest">VS</span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Ingressos em breve</span>
          </div>

          {/* Time Visitante */}
          <div className="flex items-center gap-4 flex-1 justify-center md:justify-start text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-navy flex items-center justify-center font-bold text-lg text-slate-300 border-2 border-slate-700 shadow-lg">
              {match.awayTeam.substring(0, 3).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-wide">{match.awayTeam}</h3>
              <span className="text-xs text-slate-400 uppercase font-medium">Visitante</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
