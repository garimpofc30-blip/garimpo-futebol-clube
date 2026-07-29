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
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  badge?: string;
}

export interface Raffle {
  id: string;
  title: string;
  prize: string;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
  imageUrl: string;
}
