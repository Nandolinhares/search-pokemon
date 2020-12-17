import { HttpPostClient, HttpResponse, HttpPostParams } from '@/data/protocols/http'
import { mockPostRequest } from '@/data/test/mock-post-request'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    await axios.post(params.url, params.body)
    return await Promise.resolve({
      statusCode: 200
    })
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url and body', async () => {
    const sut = new AxiosHttpClient()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
