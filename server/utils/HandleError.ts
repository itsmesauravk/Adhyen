// utils/ApiError.ts
class ApiError extends Error {
  status: number
  message: string
  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.message = message
  }
}

class TokenExpiredError extends ApiError {
  constructor(message = "Token expired") {
    super(401, message)
  }
}

export { ApiError, TokenExpiredError }
