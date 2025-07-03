// types/data.ts
export interface Match {
  id: number;
  title: string;
  teamA: string;
  bg: string;
  isLive: boolean;
  teamB: string;
  teamALogo?: string;
  teamBLogo?: string;
  league: string;
  date: string;
  time: string;
}

export const matches: Match[] = [
  {
    id: 1,
    title: "Bayern Munich vs Borussia Dortmund",
    bg: "/game.png",
    isLive: true,
    teamA: "Bayern Munich",
    teamB: "Borussia Dortmund",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Bundesliga",
    date: "2023-11-15",
    time: "20:30",
  },
  {
    id: 2,
    title: "Real Madrid vs Barcelona",
    bg: "/game.png",
    isLive: true,
    teamA: "Real Madrid",
    teamB: "Barcelona",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "La Liga",
    date: "2023-11-16",
    time: "21:00",
  },
  {
    id: 3,
    title: "Manchester United vs Liverpool",
    bg: "/game.png",
    isLive: false,
    teamA: "Manchester United",
    teamB: "Liverpool",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Premier League",
    date: "2023-11-17",
    time: "18:30",
  },
  {
    id: 4,
    title: "PSG vs Olympique Marseille",
    bg: "/game.png",
    isLive: false,
    teamA: "PSG",
    teamB: "Olympique Marseille",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Ligue 1",
    date: "2023-11-18",
    time: "20:45",
  },
  {
    id: 5,
    title: "Inter Milan vs AC Milan",
    bg: "/game.png",
    isLive: false,
    teamA: "Inter Milan",
    teamB: "AC Milan",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Serie A",
    date: "2023-11-19",
    time: "20:45",
  },
  {
    id: 6,
    title: "Ajax vs Feyenoord",
    bg: "/game.png",
    isLive: false,
    teamA: "Ajax",
    teamB: "Feyenoord",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Eredivisie",
    date: "2023-11-20",
    time: "20:00",
  },
  {
    id: 7,
    title: "Benfica vs Porto",
    bg: "/game.png",
    isLive: false,
    teamA: "Benfica",
    teamB: "Porto",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Primeira Liga",
    date: "2023-11-21",
    time: "21:15",
  },
  {
    id: 8,
    title: "Celtic vs Rangers",
    bg: "/game.png",
    isLive: false,
    teamA: "Celtic",
    teamB: "Rangers",
    teamALogo: "/logo.png",
    teamBLogo: "/logo.png",
    league: "Scottish Premiership",
    date: "2023-11-22",
    time: "20:45",
  },
];
