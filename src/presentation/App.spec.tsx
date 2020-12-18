import React from 'react'
import { render, cleanup, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { SearchPokemonSpy } from './test/mock-pokemon-search'
import App from './App'
import faker from 'faker'

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

  test('Should starts with initial state', () => {
    const { sut } = makeSut()
    const element = sut.getByTestId('main-section')
    expect(element.childElementCount).toBe(3)
  })

  test('Should Result component starts with initial state', () => {
    const { sut } = makeSut()
    const element = sut.getByTestId('result-section')
    expect(element.childElementCount).toBe(0)
  })

  test('Should call searchPokemon with correct value', async () => {
    const { sut, searchPokemonSpy } = makeSut()
    const pokemonName = faker.random.word().toLowerCase()
    const input = sut.getByTestId('input')
    fireEvent.input(input, { target: { value: pokemonName } })
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
    expect(searchPokemonSpy.params).toEqual({ name: pokemonName })
  })
})
