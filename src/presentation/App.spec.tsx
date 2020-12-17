import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import App from './App'
import { PokemonParams, SearchPokemon } from '@/domain/usecases/search-pokemon'

class SearchPokemonSpy implements SearchPokemon {
  async search (params: PokemonParams): Promise<object> {
    return await Promise.resolve({})
  }
}

type SutTypes = {
  sut: RenderResult
  searchPokemonSpy: SearchPokemonSpy
}

const makeSut = (): SutTypes => {
  const sut = render(<App />)
  const searchPokemonSpy = new SearchPokemonSpy()

  return {
    sut,
    searchPokemonSpy
  }
}

describe('App', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const element = sut.getByTestId('main-section')
    expect(element.childElementCount).toBe(2)
  })
})
