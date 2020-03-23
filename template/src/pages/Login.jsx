import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { LoginButton } from '../components'
import { getIsAuthenticated } from '../redux/auth/selectors'

const Login = ({ history }) => {
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

export default Login
