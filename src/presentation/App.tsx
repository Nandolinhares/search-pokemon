import React, { useState } from 'react'
import Context from '@/presentation/contexts/main-context'
// Styles
import Styles from './styles/global.scss'
// MUI Stuff
import Grid from '@material-ui/core/Grid'
import { SearchPokemon } from '@/domain/usecases/search-pokemon'
// Components
import Result from '@/presentation/components/Result/Result'
import Form from '@/presentation/components/Form/Form'
import Favorite from '@/presentation/components/Favorite/Favorite'

type Props = {
  searchPokemon: SearchPokemon
}

const App: React.FC<Props> = ({ searchPokemon }: Props) => {
  const [state, setState] = useState({
    pokemonName: '',
    pokemon: null,
    favoriteList: [],
    mainError: ''
  })

  return (
    <Context.Provider value={{ state, setState, searchPokemon }}>
      <Grid container className={Styles.wrap} spacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={8} data-testid="main-section" className={Styles.mainSection}>
          <img src="https://i.ibb.co/WnpST6t/pokeshop.png" alt="pokeshop" className={Styles.logo} />
          <Form />
          <Result />
          {state.mainError && (
            <span>{state.mainError}</span>
          )}
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} className={Styles.favorite}>
          <Favorite />
        </Grid>
      </Grid>
    </Context.Provider>
  )
}

export default App
