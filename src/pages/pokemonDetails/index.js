import { connect } from 'react-redux'

import PokemonDetails from './pokemonDetails'

const mapStateToProps = (state) => {
  return {
    pokemonTrainer: state.pokemonTrainer,
  }
}

const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(PokemonDetails)
