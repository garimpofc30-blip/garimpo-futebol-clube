export interface Match {
  id: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
}
