import { Header } from "@/components/ui/Header";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { NextMatch } from "@/components/ui/NextMatch";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-navyDark text-white">
      <Header />
      <HeroBanner />
      {/* Exemplo de dados para o próximo jogo */}
      <NextMatch 
        match={{
          id: "1",
          homeTeam: "Garimpo F.C.",
          homeLogo: "/images/escudo.png",
          awayTeam: "Rival F.C.",
          awayLogo: "",
          date: "15 de Agosto",
          time: "16:00",
          stadium: "Estádio Municipal",
          competition: "Campeonato Regional"
        }} 
      />
    </main>
  );
}
