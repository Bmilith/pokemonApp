import { useState, useEffect } from 'react';
import { TEAM_STORAGE_KEY } from '@/constants/baseConstants';
import type { UseTeam } from '@/types/hooks';

export const useTeam = (): UseTeam => {
  const [team, setTeam] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(TEAM_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse team from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const addToTeam = (name: string) => {
    setTeam((prev) => {
      if (prev.includes(name)) return prev;
      return [...prev, name];
    });
  };

  const removeFromTeam = (name: string) => {
    setTeam((prev) => prev.filter((n) => n !== name));
  };

  const isInTeam = (name: string) => team.includes(name);

  return {
    team,
    addToTeam,
    removeFromTeam,
    isInTeam,
  };
};
