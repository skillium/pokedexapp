import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBNavLink,
  MDBCardFooter,
} from 'mdbreact'

import { getPokemonByIdRequest } from '../../http/requests/pokemon'
import Pagination from '../../common/components/Pagination'

const PokemonDetails = ({ pokemonTrainer, match }) => {
  const history = useHistory()
  const {
    params: { id },
  } = match

  const [pokemonDetails, setPokemonDetails] = useState(null)
  const [evolutions, setEvolutions] = useState(null)
  const [pagedEvolutions, setPagedEvolutions] = useState(null)

  const getPokemonById = useCallback(async () => {
    if (!id) return

    const response = await getPokemonByIdRequest(id)

    if (typeof response === 'object') {
      const { evolutions: pokemonEvolutions, ...details } = response
      setPokemonDetails(details)

      setEvolutions(pokemonEvolutions)
    }
  }, [id])

  const pagePokemonsHandler = (data) => {
    setPagedEvolutions([...data])
  }

  useEffect(() => {
    if (!pokemonTrainer) history.push('/login')
    getPokemonById()
  }, [getPokemonById])

  return (
    pokemonDetails && (
      <MDBCard>
        <MDBCardHeader transparent className="text-capitalize">
          {`${pokemonDetails.name} details`}
        </MDBCardHeader>
        <MDBCardBody className="overflow-auto">
          <MDBListGroup>
            <MDBListGroupItem className="d-flex flex-column align-items-center">
              <MDBBadge color="success" className="mb-2">
                {pokemonDetails.name}
              </MDBBadge>

              <img
                src={pokemonDetails.image}
                alt="thumbnail"
                className="img-thumbnail border-0 pointer"
              />
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between flex-wrap">
                  Id:{' '}
                  <MDBBadge color="red" className="m-1 align-self-start">
                    {pokemonDetails.id}
                  </MDBBadge>
                  Types:{' '}
                  <MDBBadge color="light" className="m-1 align-self-start">
                    {pokemonDetails.types.join(', ')}
                  </MDBBadge>
                  Weight:{' '}
                  <MDBBadge color="blue" className="m-1 align-self-start">
                    {pokemonDetails.weight}
                  </MDBBadge>
                  Height:{' '}
                  <MDBBadge color="orange" className="m-1 align-self-start">
                    {pokemonDetails.height}
                  </MDBBadge>
                </div>

                <div className="d-flex justify-content-start flex-wrap mt-3">
                  Moves:{'  '}
                  {pokemonDetails.moves.map((move) => (
                    <MDBBadge key={move} color="purple" className="m-1">
                      {move}
                    </MDBBadge>
                  ))}
                </div>
              </div>
            </MDBListGroupItem>
            {(pagedEvolutions || []).map((p) => (
              <MDBListGroupItem
                key={p.id}
                className="d-flex flex-column align-items-center"
              >
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

                <div className="d-flex justify-content-center flex-wrap">
                  <MDBBadge color="light" className="mt-2">
                    Types: {p.types.join(', ')}
                  </MDBBadge>
                </div>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBCardBody>
        <MDBCardFooter>
          {evolutions && evolutions.length ? (
            <Pagination
              data={evolutions}
              pageDataHandler={pagePokemonsHandler}
              pageSize={2}
              clasess="my-3 float-right"
            />
          ) : null}
        </MDBCardFooter>
      </MDBCard>
    )
  )
}

PokemonDetails.propTypes = {
  pokemonTrainer: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default PokemonDetails
