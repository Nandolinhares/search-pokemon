import React, { useContext } from 'react'
import { NotFoundError } from '@/domain/errors'
import Context from '@/presentation/contexts/main-context'
// Styles
import Styles from './form-styles.scss'
// MUI Stuff
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const Form: React.FC = () => {
  const { state, setState, searchPokemon, isLoading, setIsLoading } = useContext(Context)
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

      setIsLoading(true)

      const pokemonParams = {
        name: state.pokemonName.toLowerCase()
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
          pokemon: null,
          mainError: 'Pokemon não encontrado'
        })
        setIsLoading(false)
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
      <Button type="submit" variant="contained" color="primary">
        Pesquisar
        {isLoading && (<CircularProgress color="secondary" />)}
      </Button>
    </form>
  )
}

export default Form
