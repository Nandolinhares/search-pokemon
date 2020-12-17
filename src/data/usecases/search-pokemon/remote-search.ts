import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { ServerError } from '@/domain/errors/server-error'
import { PokemonParams, SearchPokemon } from '@/domain/usecases/search-pokemon'

export class RemoteSearch implements SearchPokemon {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<PokemonParams, object>
  ) {}

  async search (params: PokemonParams): Promise<object> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new ServerError()
    }
  }
}
