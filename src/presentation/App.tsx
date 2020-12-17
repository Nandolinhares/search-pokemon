import React, { useState } from 'react'
import Styles from './styles/global.scss'
// MUI Stuff
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { SearchPokemon } from '@/domain/usecases/search-pokemon'

type Props = {
  searchPokemon: SearchPokemon
}

const App: React.FC<Props> = ({ searchPokemon }: Props) => {
  const [state, setState] = useState({
    pokemonName: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const pokemonParams = {
      name: state.pokemonName
    }

    await searchPokemon.search(pokemonParams)
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
        />
        <Button type="submit" variant="contained" color="primary" >Pesquisar</Button>
      </form>
    </section>
  )
}

export default App
