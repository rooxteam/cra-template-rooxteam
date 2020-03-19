/* eslint-disable */
import React, { useMemo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RouteComponentProps, RouteProps } from 'react-router'
import { getCookie } from '../utils/cookiesUtils'
import { AUTH_TOKEN_KEY } from '../configs/constants'

const ProtectedRoute = ({ component: Component, ...props }: RouteProps) => {
  const token = useMemo(() => getCookie(AUTH_TOKEN_KEY), [])
  const { path, location } = props

  return (
    <Route
      {...props}
      render={(renderProps: RouteComponentProps<any>) => {
        return Component && (token || path === '/login') ? (
          <Component {...renderProps} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }}
    />
  )
}

export default ProtectedRoute
