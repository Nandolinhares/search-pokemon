import { PokemonParams, SearchPokemon } from '@/domain/usecases/search-pokemon'

export class SearchPokemonSpy implements SearchPokemon {
  params: PokemonParams
  async search (params: PokemonParams): Promise<object> {
    this.params = params
    return await Promise.resolve({})
  }
}
