import { Route, Routes } from 'react-router-dom';

import { Path } from 'src/shared';
import { Layout } from 'src/pages/layout';
import { HomePage } from 'src/pages/home-page';
import { SearchPage } from 'src/pages/search-page';
import { ViewPage } from 'src/pages/view-page';
import { FavoritesPage } from 'src/pages/favorites-page';

export const Routing = () => {
   return (
      <Routes>
         <Route path={Path.HOME_PAGE} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={Path.VIEW_PAGE} element={<ViewPage />} />
            <Route path={Path.SEARCH_PAGE} element={<SearchPage />} />
            <Route path={Path.FAVORITES_PAGE} element={<FavoritesPage />} />
         </Route>
      </Routes>
   );
};
