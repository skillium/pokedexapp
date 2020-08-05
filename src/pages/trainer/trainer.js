// @flow
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import validator from 'validator'
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBInput,
  MDBBtn,
  MDBNavLink,
} from 'mdbreact'

const PokemonTrainerForm = ({
  pokemonTrainer,
  createPokemonTrainerRequest,
  updatePokemonTrainerRequest,
  getPokemonTrainerByEmailRequest,
}) => {
  const history = useHistory()
  const formState = {
    id: {
      value: '',
      valid: false,
      pristine: true,
    },
    fullname: {
      value: '',
      valid: false,
      pristine: true,
    },
    email: {
      value: '',
      valid: false,
      pristine: true,
    },
    form: { valid: false },
  }

  const [state, setState] = useState(formState)
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e) => {
    const { target } = e
    const { name, value, form }: { value: string } = target
    const fieldState = { [name]: { value, valid: true, pristine: false } }

    if (name === 'email') fieldState[name].valid = validator.isEmail(value)
    else if (name === 'fullname') {
      fieldState[name].valid = validator.isAlpha(value.replace(/\s/g, ''))
    }

    setState({
      ...state,
      [name]: { value, valid: target.checkValidity(), pristine: false },
      ...fieldState,
      form: { valid: form.checkValidity() && fieldState[name].valid },
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const values = {}

    if (!state.form.valid) {
      Object.keys(state).forEach((key) => {
        if (key !== 'form') {
          values[key] = {
            ...state[key],
            valid: state[key].valid,
            pristine: false,
          }
        }
      })

      setState(values)
    } else {
      Object.keys(formState).forEach((key) => {
        if (key !== 'form') {
          values[key] = state[key].value
        }
      })

      setLoading(true)

      if (pokemonTrainer) {
        await updatePokemonTrainerRequest(values)

        setLoading(false)
      } else {
        const response = await (history.location.pathname === '/login'
          ? getPokemonTrainerByEmailRequest(values.email)
          : createPokemonTrainerRequest(values))

        setLoading(false)

        if (response) {
          history.push('/search')
        }
      }
    }
  }

  useEffect(() => {
    if (pokemonTrainer) {
      const updatedFormState = {}

      Object.keys(pokemonTrainer).forEach((key) => {
        updatedFormState[key].value = pokemonTrainer[key]
        updatedFormState[key].valid = true
      })

      setState({ ...updatedFormState })
    }
  }, [pokemonTrainer])

  return (
    <MDBCard>
      <MDBCardHeader transparent>{`${
        history.location.pathname === '/'
          ? 'Register as a Pokemon Trainer'
          : 'Login'
      }`}</MDBCardHeader>
      <form noValidate className="needs-validation" onSubmit={onSubmitHandler}>
        <MDBCardBody>
          <div className="d-flex flex-column justify-content-center">
            <input name="id" type="hidden" value={state.id.value} />

            {history.location.pathname === '/' && (
              <MDBInput
                name="fullname"
                label="Fullname *"
                required
                validate
                value={state.fullname.value}
                onChange={onChangeHandler}
                className={`mb-0 mx-1 ${
                  !state.fullname.valid && !state.fullname.pristine
                    ? 'is-invalid'
                    : ''
                }`}
                labelClass={`${
                  !state.fullname.valid && !state.fullname.pristine
                    ? 'red-text'
                    : ''
                }`}
                containerClass="mb-1 mt-3"
                disabled={loading}
              />
            )}
            <MDBInput
              name="email"
              label="Email *"
              required
              validate
              value={state.email.value}
              onChange={onChangeHandler}
              className={`mb-0 mx-1 ${
                !state.email.valid && !state.email.pristine ? 'is-invalid' : ''
              }`}
              labelClass={`${
                !state.email.valid && !state.email.pristine ? 'red-text' : ''
              }`}
              containerClass="mb-1 mt-3"
              disabled={loading}
            />
          </div>
        </MDBCardBody>
        <MDBCardFooter>
          <MDBBtn
            type="submit"
            color="blue"
            className="w-100"
            size="sm"
            disabled={loading}
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <span>Processing...</span>
                <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              `${history.location.pathname === '/login' ? 'Login' : 'Sign Up'}`
            )}
          </MDBBtn>

          {history.location.pathname === '/login' ? (
            <div className="d-flex justify-content-end align-items-center mt-2">
              <span>Not a pokemon trainer?</span>
              <MDBNavLink
                className="waves-effect waves-light blue-text mx-2"
                to="/"
              >
                Sign Up
              </MDBNavLink>
            </div>
          ) : (
            <div className="d-flex justify-content-end align-items-center mt-2">
              <span>Are you a pokemon trainer?</span>

              <MDBNavLink
                className="waves-effect waves-light blue-text mx-2"
                to="/login"
              >
                Login
              </MDBNavLink>
            </div>
          )}
        </MDBCardFooter>
      </form>
    </MDBCard>
  )
}

PokemonTrainerForm.propTypes = {
  pokemonTrainer: PropTypes.objectOf(PropTypes.any),
  createPokemonTrainerRequest: PropTypes.func.isRequired,
  updatePokemonTrainerRequest: PropTypes.func.isRequired,
  getPokemonTrainerByEmailRequest: PropTypes.func.isRequired,
}

PokemonTrainerForm.defaultProps = {
  pokemonTrainer: null,
}

export default PokemonTrainerForm
