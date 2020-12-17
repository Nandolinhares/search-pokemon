import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteSearch } from './remote-search'
import { mockSearch } from '@/domain/test/mock-search'
import faker from 'faker'

type SutParams = {
  sut: RemoteSearch
  httpPostClient: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutParams => {
  const httpPostClient = new HttpPostClientSpy()
  const sut = new RemoteSearch(url, httpPostClient)
  return {
    sut,
    httpPostClient
  }
}

describe('SearchPokemon', () => {
  test('Should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClient } = makeSut(url)
    await sut.search(mockSearch())
    expect(httpPostClient.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClient } = makeSut()
    const body = mockSearch()
    await sut.search(body)
    expect(httpPostClient.body).toEqual(body)
  })
})
