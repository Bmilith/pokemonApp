import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/router';
import { PokemonProvider } from '@/context/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <RouterProvider router={appRouter} />
    </PokemonProvider>
  );
}

export default App;
