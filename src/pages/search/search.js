import React, { useCallback, useState, useEffect, lazy, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  getPokemonsRequest,
  getPokemonByNameRequest,
} from '../../http/requests/pokemon'

const Toolbar = lazy(() => import('./toolbar'))
const PokemonList = lazy(() => import('./list'))

const Search = ({ pokemonTrainer }) => {
  const history = useHistory()
  const [pokemons, setPokemons] = useState(null)
  const [pagedPokemons, setPagedPokemons] = useState(null)

  const getPokemons = useCallback(async () => {
    const response = await getPokemonsRequest()

    setPokemons(response)
    setPagedPokemons(response)
  }, [])

  const getPokemonByName = useCallback(async (name) => {
    const filteredArray = pokemons.filter((p) => p.name === name)

    if (filteredArray.length) {
      setPokemons([...filteredArray])
      setPagedPokemons([...filteredArray])
      return
    }

    const pokemon = await getPokemonByNameRequest(name)

    if (typeof pokemon === 'object') {
      setPokemons([pokemon])
      setPagedPokemons([pokemon])
    }
  })

  const pagePokemonsHandler = (data) => {
    setPagedPokemons([...data])
  }

  useEffect(() => {
    if (!pokemonTrainer) history.push('/login')

    getPokemons()
  }, [])

  return (
    <>
      <Suspense fallback={<></>}>
        <PokemonList
          pokemons={pokemons}
          pagedPokemons={pagedPokemons}
          pagePokemonsHandler={pagePokemonsHandler}
          history={history}
          toolbar={
            <Toolbar
              searchHandler={getPokemonByName}
              getPokemons={getPokemons}
            />
          }
        />
      </Suspense>
    </>
  )
}

Search.propTypes = {
  pokemonTrainer: PropTypes.objectOf(PropTypes.any),
}

Search.defaultProps = {
  pokemonTrainer: null,
}

export default Search
