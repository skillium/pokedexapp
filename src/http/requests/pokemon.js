import axios from 'axios'
import { toast } from 'mdbreact'

const API_URL = 'https://yuxy-pokedex-api.azurewebsites.net/api/v1'

export const getPokemonsRequest = (limit = 50) => {
  return axios
    .get(`${API_URL}/Pokemon/Get/${limit}`)
    .then((response) => response.data)
    .catch(() => toast.error('Error getting pokemons list'))
}

export const getPokemonByNameRequest = (name) => {
  return axios
    .get(`${API_URL}/Pokemon/GetByName/${name}`)
    .then((response) => response.data)
    .catch(() => toast.error(`Could not found the pokemon ${name}`))
}

export const getPokemonByIdRequest = (id) => {
  return axios
    .get(`${API_URL}/Pokemon/GetById/${id}`)
    .then((response) => response.data)
    .catch(() => toast.error(`Could not found the pokemon details`))
}
