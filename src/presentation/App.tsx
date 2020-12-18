import React, { useState } from 'react'
import Styles from './styles/global.scss'
import { SearchPokemon } from '@/domain/usecases/search-pokemon'
import Context from '@/presentation/contexts/main-context'
import Result from '@/presentation/components/Result/Result'
import Form from '@/presentation/components/Form/Form'

type Props = {
  searchPokemon: SearchPokemon
}

const App: React.FC<Props> = ({ searchPokemon }: Props) => {
  const [state, setState] = useState({
    pokemonName: '',
    pokemon: null,
    mainError: ''
  })

  return (
    <section data-testid="main-section" className={Styles.mainSection}>
      <img src="https://i.ibb.co/WnpST6t/pokeshop.png" alt="pokeshop" className={Styles.logo} />
      <Context.Provider value={{ state, setState, searchPokemon }}>
        <Form />
        <Result />
      </Context.Provider>
      {state.mainError && (
        <span>{state.mainError}</span>
      )}
    </section>
  )
}

export default App
