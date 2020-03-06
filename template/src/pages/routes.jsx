import React, { Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const Home = React.lazy(() => import('./Home/Home'));

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
];

const RouteMap = () => (
  <Suspense fallback="Loading...">
    <Switch>
      {routes.map(item => <Route {...item} key={item.path} />)}
      <Redirect exact from="*" to="/" />
    </Switch>
  </Suspense>
);

export default RouteMap;
