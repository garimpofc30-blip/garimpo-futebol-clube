"use client";

import { useEffect, useState } from "react";
import { Match } from "@/types/match";
import { matchService } from "@/services/matchService";

export function useNextMatch() {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatch() {
      try {
        const data = await matchService.getNextMatch();
        setMatch(data);
      } catch (error) {
        console.error("Erro ao carregar próximo jogo:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMatch();
  }, []);

  return { match, loading };
}
