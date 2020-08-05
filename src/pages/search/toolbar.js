import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MDBBtn, MDBInput } from 'mdbreact'

const Toolbar = ({ searchHandler, getPokemons }) => {
  const [pokemonName, setPokemonName] = useState('')

  return (
    <div className="d-flex flex-column justify-content-between align-items-center">
      <h5 className="font-weight-bold m-0 p-0">Pokemons</h5>
      <MDBInput
        containerClass="w-50"
        value={pokemonName}
        className="m-0 w-100"
        label="Search"
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <div>
        <MDBBtn
          disabled={!pokemonName}
          onClick={() => searchHandler(pokemonName)}
          color="blue"
          size="sm"
        >
          Search
        </MDBBtn>
        <MDBBtn onClick={getPokemons} color="blue" size="sm">
          List
        </MDBBtn>
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  getPokemons: PropTypes.func.isRequired,
}

export default Toolbar
