import { openDB } from 'idb';
import { DB_NAME, STORE_NAME } from '@/constants/baseConstants';
import type { Pokemon } from '@/types/pokemons';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
      }
    },
  });
}

export async function getPokemonsFromDB(): Promise<Pokemon[]> {
  const db = await initDB();
  const allData = await db.getAll(STORE_NAME);
  return allData;
}

export async function savePokemonsToDB(pokemons: Pokemon[]) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const pokemon of pokemons) {
    await tx.store.put(pokemon);
  }
  await tx.done;
}
