import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components'
import { About, Home } from './pages'
import './App.module.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <div className="container">
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export default App
