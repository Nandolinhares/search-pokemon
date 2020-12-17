export class NotFoundError extends Error {
  constructor () {
    super('Pokemon não encontrado')
    this.name = 'NotFoundError'
  }
}
