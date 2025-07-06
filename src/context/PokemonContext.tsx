import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { ALL_POKEMONS } from '@/constants/pokemonConstants';
import {
  fetchBatchPokemonDetails,
  fetchPokemonsList,
} from '@/services/pokemonService';
import { getPokemonsFromDB, savePokemonsToDB } from '@/storage/indexedDB';
import { PokemonContextType } from '@/types/context';
import type { Pokemon } from '@/types/pokemons';
import { transformToPokemon } from '@/utils/pokemon';

export const PokemonContext = createContext<PokemonContextType>({
  pokemons: [],
  loading: true,
});

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // If cached data exists, use it and skip fetching from the API (IndexedDB for offline mode and faster loading)
        const cachedPokemons = await getPokemonsFromDB();
        if (cachedPokemons.length > 0) {
          setPokemons(cachedPokemons);
          setLoading(false);
          return;
        }

        const data = await fetchPokemonsList(ALL_POKEMONS);
        const urls = data.results.map((p) => p.url);
        // Reduce this batchSize if network issues, API rate limits, or browser limitations occur
        const detailsData = await fetchBatchPokemonDetails(urls, 100);

        // mapping axios result
        const detailed = detailsData.map(transformToPokemon);

        setPokemons(detailed);
        await savePokemonsToDB(detailed);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
