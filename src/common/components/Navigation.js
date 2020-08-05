import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdbreact'

const Navigation = ({ children, pokemonTrainer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const mainStyle = {
    paddingTop: '5rem',
  }

  return (
    <>
      <MDBNavbar color="red" dark expand="md">
        <MDBNavbarBrand>
          <strong className="yellow-text">Pokedex</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          {pokemonTrainer && (
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="/search">
                  <MDBIcon icon="search" /> Search
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          )}
          {pokemonTrainer && (
            <MDBNavbarNav right>
              <MDBNavItem className="white-text">
                Welcome {pokemonTrainer.fullname}
              </MDBNavItem>
            </MDBNavbarNav>
          )}
        </MDBCollapse>
      </MDBNavbar>
      <main style={mainStyle}>
        <MDBContainer style={{ height: '100vh' }}>
          <MDBRow className="justify-content-center">
            <MDBCol xs="12" md="6">
              {children}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </main>
    </>
  )
}

Navigation.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  pokemonTrainer: PropTypes.objectOf(PropTypes.any),
}

Navigation.defaultProps = {
  pokemonTrainer: null,
}

const mapStateToProps = (state) => {
  return {
    pokemonTrainer: state.pokemonTrainer,
  }
}

const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(Navigation)
