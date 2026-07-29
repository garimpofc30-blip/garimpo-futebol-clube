import { HeroBanner } from "@/components/ui/HeroBanner";
import { NextMatch } from "@/components/ui/NextMatch";
import { NewsGrid } from "@/components/ui/NewsGrid";
import { FeaturedProducts } from "@/components/ui/FeaturedProducts";
import { ActiveRaffles } from "@/components/ui/ActiveRaffles";
import { SponsorsSection } from "@/components/ui/SponsorsSection";

// Placeholders Elegantes (Dados Prontos para Conectar ao Supabase)
const mockMatch = {
  id: "1",
  homeTeam: "Garimpo F.C.",
  homeLogo: "",
  awayTeam: "Série A Rival",
  awayLogo: "",
  date: "15 de Agosto",
  time: "16:00",
  stadium: "Estádio Municipal",
  competition: "Campeonato Regional • Rodada 5",
};

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16 bg-brand-navyDark text-white">
      {/* 1. Banner Principal */}
      <HeroBanner />

      {/* 2. Próximo Jogo */}
      <NextMatch match={mockMatch} />

      {/* 3. Últimas Notícias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Informativo</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Últimas Notícias</h2>
          </div>
        </div>
        <NewsGrid />
      </section>

      {/* 4. Produtos em Destaque */}
      <section className="bg-brand-navy py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Manto Oficial</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Loja Oficial</h2>
            </div>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* 5. Rifas em Andamento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Apoie o Clube</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Rifas Oficiais</h2>
          </div>
        </div>
        <ActiveRaffles />
      </section>

      {/* 6. Patrocinadores */}
      <SponsorsSection />
    </div>
  );
}
