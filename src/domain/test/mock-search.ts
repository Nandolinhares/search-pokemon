import { PokemonParams } from '@/domain/usecases/search-pokemon'
import faker from 'faker'

export const mockSearch = (): PokemonParams => ({
  name: faker.name.firstName()
})
