import { useMemo } from 'react';
import { getAverage, getTeamStatsTotals } from './helper';
import { Summary } from '@/components/core';
import type { Pokemon } from '@/types/pokemons';

interface TeamSummaryProps {
  team: Pokemon[];
}

export const TeamSummary = ({ team }: TeamSummaryProps) => {
  const items = useMemo(() => {
    const { hp, attack, defense, speed } = getTeamStatsTotals(team);
    const types = [...new Set(team.flatMap((p) => p.types))];

    return [
      { label: 'Total HP', value: hp },
      { label: 'Avg Attack', value: getAverage(attack, team.length) },
      { label: 'Avg Defense', value: getAverage(defense, team.length) },
      { label: 'Avg Speed', value: getAverage(speed, team.length) },
      {
        label: 'Types Covered',
        value: types.length > 0 ? types.join(', ') : 'None',
      },
    ];
  }, [team]);

  return <Summary title="Team Summary" items={items} />;
};
