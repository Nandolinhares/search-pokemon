import React, { useContext } from 'react'
// MUI Stuff
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { NotFoundError } from '@/domain/errors'
import Context from '@/presentation/contexts/main-context'
// Styles
import Styles from './form-styles.scss'

const Form: React.FC = () => {
  const { state, setState, searchPokemon } = useContext(Context)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.pokemonName.trim() === '') {
        return
      }

      const pokemonParams = {
        name: state.pokemonName
      }

      const pokemonResult = await searchPokemon.search(pokemonParams)
      setState({
        ...state,
        pokemon: pokemonResult,
        mainError: ''
      })
    } catch (error) {
      if (error.message === 'Request failed with status code 404') {
        setState({
          ...state,
          mainError: 'Pokemon não encontrado'
        })
        throw new NotFoundError()
      }
    }
  }
  return (
    <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
      <TextField
        inputProps={{ 'data-testid': 'input' }}
        id="outlined-basic"
        label="Pesquisar Pokemon"
        variant="outlined"
        name="pokemonName"
        onChange={handleChange}
        value={state.pokemonName}
        className={Styles.input}
      />
      <Button type="submit" variant="contained" color="primary" >Pesquisar</Button>
    </form>
  )
}

export default Form
