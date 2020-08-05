import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'mdbreact'
import './index.css'
import Navigation from './common/components/Navigation'
import PokemonSearch from './pages/search'
import configStore from './redux/store'
import initialState from './redux/initialState'
import PokemonDetails from './pages/pokemonDetails'
import PokemonTrainerForm from './pages/trainer'

const store = configStore(initialState)

const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <Router>
          <Navigation>
            <Route path="/search" component={PokemonSearch} />
            <Route exact path="/pokemon/:id" component={PokemonDetails} />
            <Route exact path="/" component={PokemonTrainerForm} />
            <Route exact path="/login" component={PokemonTrainerForm} />
          </Navigation>
        </Router>
      </ReduxProvider>
      <ToastContainer newestOnTop autoClose={5000} />
    </>
  )
}

export default App
