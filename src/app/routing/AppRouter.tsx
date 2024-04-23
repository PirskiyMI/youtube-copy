import { lazy } from 'react';
import {
   Route,
   RouterProvider,
   createHashRouter,
   createRoutesFromElements,
} from 'react-router-dom';

import { Path } from 'src/shared/constants';
import { Layout } from '../layout';
import { Link } from 'react-router-dom';

const HomePage = lazy(async () => {
   const { HomePage } = await import('src/pages/home-page');
   return { default: HomePage };
});
const FavoritesPage = lazy(async () => {
   const { FavoritesPage } = await import('src/pages/favorites-page');
   return { default: FavoritesPage };
});
const ViewPage = lazy(async () => {
   const { ViewPage } = await import('src/pages/view-page');
   return { default: ViewPage };
});
const SearchPage = lazy(async () => {
   const { SearchPage } = await import('src/pages/search-page');
   return { default: SearchPage };
});

export const AppRouter = () => {
   const routers = createRoutesFromElements(
      <Route
         path={Path.HOME_PAGE}
         element={<Layout />}
         handle={{ crumb: <Link to="/">Home</Link> }}>
         <Route index element={<HomePage />} />
         <Route path={Path.VIEW_PAGE} element={<ViewPage />} />
         <Route path={Path.FAVORITES_PAGE} element={<FavoritesPage />} />
         <Route path={Path.SEARCH_PAGE} element={<SearchPage />} />
      </Route>,
   );

   const router = createHashRouter(routers, {});

   return <RouterProvider router={router} />;
};
