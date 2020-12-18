import React, { useState } from 'react'
import Styles from './styles/global.scss'
import { SearchPokemon } from '@/domain/usecases/search-pokemon'
import Context from '@/presentation/contexts/main-context'
import Result from '@/presentation/components/Result/Result'
import Form from '@/presentation/components/Form/Form'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

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
        <Grid item xs={12} sm={4} md={4} lg={4} className={Styles.favoriteSection}>
          <Paper elevation={4} className={Styles.paper}>
            <h2 className={Styles.h2}>Favoritos</h2>
            {state.favoriteList.length === 0 && (
              <h3 className={Styles.h3}>Carrinho Vazio</h3>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}

export default App
