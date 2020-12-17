import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteSearch } from './remote-search'
import { mockSearch } from '@/domain/test/mock-search'
import { PokemonParams } from '@/domain/usecases/search-pokemon'
import { NotFoundError, ServerError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import faker from 'faker'

type SutParams = {
  sut: RemoteSearch
  httpPostClientSpy: HttpPostClientSpy<PokemonParams, object>
}

const makeSut = (url: string = faker.internet.url()): SutParams => {
  const httpPostClientSpy = new HttpPostClientSpy<PokemonParams, object>()
  const sut = new RemoteSearch(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('SearchPokemon', () => {
  test('Should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.search(mockSearch())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const body = mockSearch()
    await sut.search(body)
    expect(httpPostClientSpy.body).toEqual(body)
  })

  test('Should throw NotFoundError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.search(mockSearch())
    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('Should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.search(mockSearch())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should return an object if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const mockResult = {
      name: faker.name.firstName(),
      sprites: {
        imageUrl: ''
      }
    }
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResult
    }
    const result = await sut.search(mockSearch())
    expect(typeof result).toBe('object')
  })
})
