import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import reduxThunk from 'redux-thunk'
import pokemonTrainerReducer from './pokemonTrainerReducer'

export default function configStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    combineReducers({ pokemonTrainer: pokemonTrainerReducer }),
    initialState,
    composeEnhancers(
      applyMiddleware(reduxThunk, reduxImmutableStateInvariant())
    )
  )
}
