import React, { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Context from '@/presentation/contexts/main-context'
// Styles
import Styles from './Result-styles.scss'

const Result: React.FC = () => {
  const { state } = useContext(Context)
  if (state.pokemon !== null) {
    if (state.pokemon.sprites === undefined) {
      return (
        <div>
            Loading...
        </div>
      )
    }
  }
  return (
    <section data-testid="result-section" className={Styles.section}>
      {state.pokemon !== null && (
        <>
          <h2>Resultado da busca</h2>
          <Paper elevation={2} className={Styles.paper}>
            {state.pokemon.sprites.front_default !== undefined && <img src={state.pokemon.sprites.front_default} alt={state.pokemon.name} className={Styles.img} />}
            {state.pokemon && <h2 className={Styles.h2}>Nome: {state.pokemon.name}</h2>}
          </Paper>
        </>
      )}
    </section>
  )
}

export default Result
