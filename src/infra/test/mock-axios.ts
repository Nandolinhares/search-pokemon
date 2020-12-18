import axios from 'axios'
import faker from 'faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.random.number()
  }

  mockedAxios.get.mockResolvedValue(mockedAxiosResult)

  return mockedAxios
}
