import { Provider } from 'react-redux';

import { store } from './../store/index';
import { AppRouter } from '../routing';

export const Providers = () => {
   return (
      <Provider store={store}>
         <AppRouter />
      </Provider>
   );
};
