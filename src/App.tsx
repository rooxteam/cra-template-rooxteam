import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components'
import './App.module.scss'
import RouteMap from './routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <RouteMap />
    </BrowserRouter>
  )
}

export default App
