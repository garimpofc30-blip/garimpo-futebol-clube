import { Match } from "@/types/match";

export const matchService = {
  async getNextMatch(): Promise<Match> {
    return {
      id: "1",
      homeTeam: "Garimpo F.C.",
      homeLogo: "/images/escudo.png",
      awayTeam: "Série A Rival",
      awayLogo: "",
      date: "15 de Agosto",
      time: "16:00",
      stadium: "Estádio Municipal",
      competition: "Campeonato Regional • Rodada 5",
      status: "UPCOMING",
    };
  },
};
