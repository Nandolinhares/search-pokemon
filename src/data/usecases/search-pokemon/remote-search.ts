import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { ServerError, NotFoundError } from '@/domain/errors'
import { PokemonParams, SearchPokemon } from '@/domain/usecases/search-pokemon'

export class RemoteSearch implements SearchPokemon {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<object>
  ) {}

  async search (params: PokemonParams): Promise<object> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${params.name}`
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
