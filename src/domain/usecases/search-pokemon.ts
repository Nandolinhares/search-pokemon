export type PokemonParams = {
  name: string
}

export interface SearchPokemon {
  search: (params: PokemonParams) => Promise<object>
}
