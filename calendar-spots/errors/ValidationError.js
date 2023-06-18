export class ValidationError extends Error {
  constructor (message = 'Validation failed') {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
