import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client'
import { HttpResponse } from '../protocols/http/http-response'

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
  url?: string
  response: HttpResponse<T> = {
    statusCode: 200
  }

  async get (params: HttpGetParams): Promise<HttpResponse<T>> {
    this.url = params.url
    return await Promise.resolve(this.response)
  }
}
