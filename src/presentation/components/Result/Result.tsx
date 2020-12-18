import React, { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Context from '@/presentation/contexts/result-context'
// Styles
import Styles from './Result-styles.scss'

const Result: React.FC = () => {
  const pokemon = useContext(Context)
  if (pokemon !== null) {
    if (pokemon.sprites === undefined) {
      return (
        <div>
            Loading...
        </div>
      )
    }
  }
  return (
    <section data-testid="result-section" className={Styles.section}>
      {pokemon !== null && (
        <>
          <h2>Resultado da busca</h2>
          <Paper elevation={2} className={Styles.paper}>
            {pokemon.sprites.front_default !== undefined && <img src={pokemon.sprites.front_default} alt={pokemon.name} className={Styles.img} />}
            {pokemon && <h2 className={Styles.h2}>Nome: {pokemon.name}</h2>}
          </Paper>
        </>
      )}
    </section>
  )
}

export default Result
