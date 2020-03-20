import React, { useEffect, useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar } from './components'
import './App.module.scss'
import RouteMap from './routes'
import { getCookie } from './utils/cookiesUtils'
import { AUTH_TOKEN_KEY } from './configs/constants'
import { appInit } from './redux/auth/actions'

const App: React.FC = () => {
  const token = useMemo(() => getCookie(AUTH_TOKEN_KEY), [])
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      dispatch(appInit())
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <RouteMap />
    </BrowserRouter>
  )
}

export default App
