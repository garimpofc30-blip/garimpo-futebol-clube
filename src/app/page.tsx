"use client";

import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/modules/hero/HeroBanner";
import { NextMatch } from "@/components/modules/match/NextMatch";
import { useNextMatch } from "@/hooks/useMatches";

export default function HomePage() {
  const { match, loading } = useNextMatch();

  return (
    <div className="min-h-screen bg-brand-navyDark text-white">
      <Header />
      <main>
        <HeroBanner />
        {!loading && match && <NextMatch match={match} />}
      </main>
    </div>
  );
}
