// @flow

import React from 'react'
import PropTypes from 'prop-types'

import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBNavLink,
} from 'mdbreact'

import Pagination from '../../common/components/Pagination'

const PokemonList = ({
  pokemons,
  pagedPokemons,
  pagePokemonsHandler,
  toolbar,
}: {
  pokemons: any[],
  pagedPokemons: any[],
}) => {
  return (
    <MDBCard style={{ height: '100vh' }}>
      <MDBCardHeader transparent>{toolbar}</MDBCardHeader>
      <MDBCardBody className="overflow-auto">
        <MDBListGroup>
          {(pagedPokemons || []).map((p) => (
            <MDBListGroupItem className="d-flex flex-column align-items-center">
              <MDBBadge color="success" className="mb-2">
                {p.name}
              </MDBBadge>
              <MDBNavLink
                className="waves-effect waves-light"
                to={`/pokemon/${p.id}`}
              >
                <img
                  src={p.image}
                  alt="thumbnail"
                  className="img-thumbnail border-0 pointer"
                />
              </MDBNavLink>

              <MDBBadge color="light" className="mt-2">
                {p.types.join(', ')}
              </MDBBadge>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </MDBCardBody>
      <MDBCardFooter>
        {pokemons && pokemons.length ? (
          <Pagination
            data={pokemons}
            pageDataHandler={pagePokemonsHandler}
            pageSize={10}
            clasess="my-3 float-right"
          />
        ) : null}
      </MDBCardFooter>
    </MDBCard>
  )
}

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.any),
  pagedPokemons: PropTypes.arrayOf(PropTypes.any),
  pagePokemonsHandler: PropTypes.func.isRequired,
  toolbar: PropTypes.objectOf(PropTypes.any).isRequired,
}

PokemonList.defaultProps = {
  pokemons: null,
  pagedPokemons: null,
}

export default PokemonList
