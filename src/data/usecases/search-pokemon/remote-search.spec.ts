import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteSearch } from './remote-search'

describe('SearchPokemon', () => {
  test('Should call HttpPostClient with correct url', async () => {
    const url = 'any_url'
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteSearch(url, httpPostClient)
    await sut.search({ name: 'Teste' })
    expect(httpPostClient.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const url = 'any_url'
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteSearch(url, httpPostClient)
    const body = { name: 'Teste' }
    await sut.search(body)
    expect(httpPostClient.body).toEqual({
      name: 'Teste'
    })
  })
})
