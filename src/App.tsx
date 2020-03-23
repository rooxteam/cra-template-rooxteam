import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar } from './components'
import './App.module.scss'
import RouteMap from './routes'
import { getCookie } from './utils/cookiesUtils'
import { AUTH_TOKEN_KEY } from './configs/constants'
import { appInit } from './redux/auth/actions'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = getCookie(AUTH_TOKEN_KEY)
    if (token) {
      dispatch(appInit())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar />
      <RouteMap />
    </BrowserRouter>
  )
}

export default App
