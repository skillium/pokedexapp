import { connect } from 'react-redux'

import {} from '../../redux/actions'

import Search from './search'

const mapStateToProps = (state) => {
  return {
    pokemonTrainer: state.pokemonTrainer,
  }
}

const mapDispachToProps = {}

export default connect(mapStateToProps, mapDispachToProps)(Search)
