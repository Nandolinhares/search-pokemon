import { mockGetRequest } from '@/data/test/mock-get-request'
import { mockAxios } from '@/infra/test/mock-axios'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockGetRequest()
    await sut.get(request)
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
  })

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.get(mockGetRequest())
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value) // 0 É resolved e 1 rejecteds. Comparando promise com promise
  })
})
