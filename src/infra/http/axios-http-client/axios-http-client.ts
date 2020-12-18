import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient<any> {
  async get (params: HttpGetParams): Promise<HttpResponse<any>> {
    const httpResponse = await axios.get(params.url)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
