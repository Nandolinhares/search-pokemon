import { HttpGetClientSpy } from '@/data/test/mock-http-client'
import { RemoteSearch } from './remote-search'
import { mockSearch } from '@/domain/test/mock-search'
import { NotFoundError, ServerError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import faker from 'faker'

type SutParams = {
  sut: RemoteSearch
  httpGetClientSpy: HttpGetClientSpy<object>
}

const makeSut = (url: string = faker.internet.url()): SutParams => {
  const httpGetClientSpy = new HttpGetClientSpy<object>()
  const sut = new RemoteSearch(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('SearchPokemon', () => {
  test('Should throw NotFoundError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.search(mockSearch())
    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('Should throw ServerError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.search(mockSearch())
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should return an object if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const mockResult = {
      name: faker.name.firstName(),
      sprites: {
        imageUrl: ''
      }
    }
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResult
    }
    const result = await sut.search(mockSearch())
    expect(typeof result).toBe('object')
  })
})
