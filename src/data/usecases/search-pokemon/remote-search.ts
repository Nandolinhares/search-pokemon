import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { PokemonParams, SearchPokemon } from '@/domain/usecases/search-pokemon'

export class RemoteSearch implements SearchPokemon {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<PokemonParams, object>
  ) {}

  async search (params: PokemonParams): Promise<object> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    return await Promise.resolve({})
  }
}
