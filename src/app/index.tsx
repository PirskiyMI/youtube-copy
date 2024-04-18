import { Routing } from './routing';
import { withProviders } from './providers';
import './styles/global.scss';

const App = (): JSX.Element => {
   return <Routing />;
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
