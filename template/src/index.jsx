import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'normalize.css/normalize.css';

import RouteMap from './pages/routes';
import store, { history } from './store';
import './index.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RouteMap />
    </ConnectedRouter>
  </Provider>
);

const renderApp = () => {
  render(
    <App />,
    document.getElementById('root'),
  );
};

// enable hot reloading
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./pages/routes', renderApp);
}

renderApp();
