import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { About, Home, Login } from './pages'
import ProtectedRoute from './pages/ProtectedRoute'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
]

// add tracking to pages
/*
routes = routes.map(route => {
  const TrackedComponent = trackDisplayHOC(route.component)
  return {
    ...route,
    component: TrackedComponent,
  }
})

 */

const RouteMap = () => {
  return (
    <React.Fragment>
      {/* <YMInitializer accounts={[ymOptions.counterId]} /> */}
      <div className="container">
        <Switch>
          {routes.map(item => {
            return (
              <ProtectedRoute
                path={item.path}
                component={item.component}
                exact={item.exact}
                key={item.path}
              />
            )
          })}
          <Redirect exact from="*" to="/" />
        </Switch>
      </div>
    </React.Fragment>
  )
}

export default RouteMap
