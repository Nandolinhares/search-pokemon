import React from 'react'
import Styles from './styles/global.scss'
// MUI Stuff
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const App: React.FC = () => {
  return (
    <section data-testid="main-section" className={Styles.mainSection}>
      <img src="https://i.ibb.co/WnpST6t/pokeshop.png" alt="pokeshop" className={Styles.logo} />
      <form className={Styles.form}>
        <TextField id="outlined-basic" label="Pesquisar Pokemon" variant="outlined" />
        <Button variant="contained" color="primary" >Pesquisar</Button>
      </form>
    </section>
  )
}

export default App
