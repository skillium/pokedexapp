import axios from 'axios'
import { toast } from 'mdbreact'

export const getPokemonsRequest = (limit = 50) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/Pokemon/Get/${limit}`)
    .then((response) => response.data)
    .catch(() => toast.error('Error getting pokemons list'))
}

export const getPokemonByNameRequest = (name) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/Pokemon/GetByName/${name}`)
    .then((response) => response.data)
    .catch(() => toast.error(`Could not found the pokemon ${name}`))
}

export const getPokemonByIdRequest = (id) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/Pokemon/GetById/${id}`)
    .then((response) => response.data)
    .catch(() => toast.error(`Could not found the pokemon details`))
}
