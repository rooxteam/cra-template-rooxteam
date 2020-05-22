import React, { Fragment, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginButton } from '../components'
import { getIsAuthenticated } from '../redux/auth/selectors'

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const isAuthenticated = useSelector(getIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history])
  return (
    <Fragment>
      <h1>Login</h1>
      <LoginButton />
    </Fragment>
  )
}

export default Login
