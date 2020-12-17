import React from 'react'
import { render, cleanup, RenderResult, fireEvent } from '@testing-library/react'
import App from './App'
import { PokemonParams, SearchPokemon } from '@/domain/usecases/search-pokemon'
import faker from 'faker'

class SearchPokemonSpy implements SearchPokemon {
  params: PokemonParams
  async search (params: PokemonParams): Promise<object> {
    this.params = params
    return await Promise.resolve({})
  }
}

type SutTypes = {
  sut: RenderResult
  searchPokemonSpy: SearchPokemonSpy
}

const makeSut = (): SutTypes => {
  const searchPokemonSpy = new SearchPokemonSpy()
  const sut = render(<App searchPokemon={searchPokemonSpy} />)
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

  test('Should call searchPokemon wih correct value', () => {
    const { sut, searchPokemonSpy } = makeSut()
    const pokemonName = faker.random.word()
    const input = sut.getByTestId('input')
    fireEvent.input(input, { target: { value: pokemonName } })
    fireEvent.submit(sut.getByTestId('form'))
    expect(searchPokemonSpy.params).toEqual({ name: pokemonName })
  })
})
