import React, { useState, useEffect } from 'react'
import Styles from './styles/global.scss'
// MUI Stuff
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { SearchPokemon } from '@/domain/usecases/search-pokemon'
import Context from '@/presentation/contexts/result-context'
import Result from '@/presentation/components/Result/Result'
import { NotFoundError } from '@/domain/errors'

type Props = {
  searchPokemon: SearchPokemon
}

const App: React.FC<Props> = ({ searchPokemon }: Props) => {
  const [state, setState] = useState({
    pokemonName: '',
    pokemon: null,
    mainError: ''
  })

  useEffect(() => {

  }, [state.pokemon])

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
        pokemon: pokemonResult
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
    <section data-testid="main-section" className={Styles.mainSection}>
      <img src="https://i.ibb.co/WnpST6t/pokeshop.png" alt="pokeshop" className={Styles.logo} />
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
      <Context.Provider value={state.pokemon}>
        <Result />
      </Context.Provider>
      {state.mainError && (
        <span>{state.mainError}</span>
      )}
    </section>
  )
}

export default App
