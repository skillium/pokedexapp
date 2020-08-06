import axios from 'axios'
import { toast } from 'mdbreact'

import {
  POKEMON_TRAINER_GET_REQUEST,
  POKEMON_TRAINER_GET_SUCCESS,
  POKEMON_TRAINER_CREATE_ERROR,
  POKEMON_TRAINER_CREATE_REQUEST,
  POKEMON_TRAINER_CREATE_SUCCESS,
  POKEMON_TRAINER_UPDATE_REQUEST,
  POKEMON_TRAINER_UPDATE_SUCCESS,
  POKEMON_TRAINER_UPDATE_ERROR,
} from './constants'

const API_URL = 'https://yuxy-pokedex-api.azurewebsites.net/api/v1'

export const getPokemonTrainerByIdRequest = (id) => (dispatch) => {
  dispatch({ type: POKEMON_TRAINER_GET_REQUEST, payload: { id } })

  return axios
    .get(`${API_URL}/PokemonTrainer/GetById/${id}`)
    .then((response) => {
      const trainer = response.data
      dispatch({ type: POKEMON_TRAINER_GET_SUCCESS, payload: trainer })

      return trainer
    })
    .catch(() => {
      dispatch({
        type: POKEMON_TRAINER_CREATE_ERROR,
        payload: { message: 'Could not find the pokemon trainer.' },
      })
      toast.error('Could not find the pokemon trainer.')
    })
}

export const getPokemonTrainerByEmailRequest = (email) => (dispatch) => {
  dispatch({ type: POKEMON_TRAINER_GET_REQUEST, payload: { email } })

  return axios
    .get(`${API_URL}/PokemonTrainer/GetByEmail/${email}`)
    .then((response) => {
      const trainer = response.data
      dispatch({ type: POKEMON_TRAINER_GET_SUCCESS, payload: trainer })

      return trainer
    })
    .catch(() => {
      dispatch({
        type: POKEMON_TRAINER_CREATE_ERROR,
        payload: { message: 'Could not find the pokemon trainer.' },
      })
      toast.error('Could not find the pokemon trainer.')
    })
}

export const createPokemonTrainerRequest = (trainer) => (dispatch) => {
  dispatch({ type: POKEMON_TRAINER_CREATE_REQUEST, payload: trainer })

  return axios
    .post(`${API_URL}/PokemonTrainer/Create`, trainer)
    .then((response) => {
      const createdTrainer = response.data

      dispatch({
        type: POKEMON_TRAINER_CREATE_SUCCESS,
        payload: createdTrainer,
      })
      return createdTrainer
    })
    .catch(() => {
      dispatch({
        type: POKEMON_TRAINER_CREATE_ERROR,
        payload: { message: 'Could not create the pokemon trainer.' },
      })
      toast.error('Could not create the pokemon trainer.')
    })
}

export const updatePokemonTrainerRequest = (trainer) => (dispatch) => {
  dispatch({ type: POKEMON_TRAINER_UPDATE_REQUEST, payload: trainer })

  return axios
    .put(`${API_URL}/PokemonTrainer/Update`, trainer)
    .then((response) => {
      const createdTrainer = response.data

      dispatch({
        type: POKEMON_TRAINER_UPDATE_SUCCESS,
        payload: createdTrainer,
      })
      return createdTrainer
    })
    .catch(() => {
      dispatch({
        type: POKEMON_TRAINER_UPDATE_ERROR,
        payload: { message: 'Could not update the pokemon trainer.' },
      })
      toast.error('Could not update the pokemon trainer.')
    })
}
