import type { Pokemon } from '@/types/pokemons';

export function getTeamStatsTotals(team: Pokemon[]) {
  return team.reduce(
    (acc, p) => {
      acc.hp += p.stats?.hp || 0;
      acc.attack += p.stats?.attack || 0;
      acc.defense += p.stats?.defense || 0;
      acc.speed += p.stats?.speed || 0;
      return acc;
    },
    { hp: 0, attack: 0, defense: 0, speed: 0 }
  );
}

export function getAverage(total: number, count: number) {
  return count ? (total / count).toFixed(1) : '0';
}
