import React, { useContext } from 'react'
import Context from '@/presentation/contexts/main-context'
// Styles
import Styles from './Favorite-styles.scss'
// MUI Stuff
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const Favorite: React.FC = () => {
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
    <Paper elevation={4} className={Styles.paper}>
      <h2 className={Styles.h2}>Favoritos</h2>
      {state.favoriteList.length === 0 ? (
        <h3 className={Styles.h3}>Carrinho Vazio</h3>
      ) : (
        <section className={Styles.section}>
          {state.favoriteList.map(pokemon => (
            <Paper key={Math.random() * 1000} elevation={3} className={Styles.paperSecondary}>
              <img src={pokemon.imageUrl} alt={pokemon.name} className={Styles.img} />
              <h2 className={Styles.h2}>Nome: {pokemon.name}</h2>
              <Button variant="contained" color="secondary" className={Styles.button}>Remover</Button>
            </Paper>
          ))}
        </section>
      )}
    </Paper>
  )
}

export default Favorite
