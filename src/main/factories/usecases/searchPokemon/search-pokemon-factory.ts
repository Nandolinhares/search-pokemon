import { RemoteSearch } from '@/data/usecases/search-pokemon/remote-search'
import { SearchPokemon } from '@/domain/usecases/search-pokemon'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client'

export const makeRemoteSearch = (): SearchPokemon => {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'
  return new RemoteSearch(apiUrl, makeAxiosHttpClient())
}
