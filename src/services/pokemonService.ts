import axios from 'axios';
import type { PokemonAxiosDataInfo, PokemonAxiosData } from '@/types/context';

export const fetchPokemonsList = async (limit: number) => {
  const response = await axios.get<PokemonAxiosData>(
    `/api/pokemon?limit=${limit}`
  );
  return response.data;
};

export const fetchBatchPokemonDetails = async (
  urls: string[],
  batchSize = 20
): Promise<PokemonAxiosDataInfo[]> => {
  const results = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const responses = await Promise.all(batch.map((url) => axios.get(url)));
    results.push(...responses.map((res) => res.data));
  }
  return results;
};
