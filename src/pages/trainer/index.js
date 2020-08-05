import { connect } from 'react-redux'

import {
  createPokemonTrainerRequest,
  getPokemonTrainerByEmailRequest,
} from '../../redux/actions'

import TrainerForm from './trainer'

const mapStateToProps = (state) => {
  return {
    pokemonTrainer: state.pokemonTainer,
  }
}

const mapDispachToProps = {
  createPokemonTrainerRequest,
  getPokemonTrainerByEmailRequest,
  updatePokemonTrainerRequest: () => {},
}

export default connect(mapStateToProps, mapDispachToProps)(TrainerForm)
