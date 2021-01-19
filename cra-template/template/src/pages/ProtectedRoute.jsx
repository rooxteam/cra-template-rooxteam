/* eslint-disable */
import React, { useMemo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getCookie } from '../utils/cookiesUtils'
import { AUTH_TOKEN_KEY } from '../configs/constants'

const ProtectedRoute = ({ component: Component, ...props }) => {
  const token = useMemo(() => getCookie(AUTH_TOKEN_KEY), [])
  const { path, location } = props

  return (
    <Route
      {...props}
      render={(renderProps) => {
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
