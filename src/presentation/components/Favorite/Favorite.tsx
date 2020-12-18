import React, { useContext } from 'react'
import Context from '@/presentation/contexts/main-context'
// Styles
import Styles from './Favorite-styles.scss'
// MUI Stuff
import Paper from '@material-ui/core/Paper'

const Favorite: React.FC = () => {
  const { state } = useContext(Context)
  return (
    <Paper elevation={4} className={Styles.paper}>
      <h2 className={Styles.h2}>Favoritos</h2>
      {state.favoriteList.length === 0 && (
        <h3 className={Styles.h3}>Carrinho Vazio</h3>
      )}
    </Paper>
  )
}

export default Favorite
