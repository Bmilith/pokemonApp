import { Navigate, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage, ComparePage, NotFoundPage, TeamBuilderPage } from '@/pages';

export const appRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home?page=1&pageSize=20" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'compare/:pokemonOne/with/:pokemonTwo',
        element: <ComparePage />,
      },
      {
        path: 'team-builder',
        element: <TeamBuilderPage />,
      },
    ],
  },
]);
