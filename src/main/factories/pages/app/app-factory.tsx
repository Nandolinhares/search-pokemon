import React from 'react'
import App from '@/presentation/App'
import { makeRemoteSearch } from '@/main/factories/usecases/searchPokemon/search-pokemon-factory'

const MakeApp: React.FC = () => {
  return (
    <App
      searchPokemon={makeRemoteSearch()}
    />
  )
}

export default MakeApp
