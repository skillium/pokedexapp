import {
  POKEMON_TRAINER_GET_SUCCESS,
  POKEMON_TRAINER_CREATE_SUCCESS,
  POKEMON_TRAINER_UPDATE_SUCCESS,
} from './constants'

const initialState = null

const pokemonTrainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POKEMON_TRAINER_GET_SUCCESS:
      return { ...action.payload }
    case POKEMON_TRAINER_CREATE_SUCCESS:
      return { ...action.payload }
    case POKEMON_TRAINER_UPDATE_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return initialState
  }
}

export default pokemonTrainerReducer
