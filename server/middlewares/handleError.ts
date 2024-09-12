import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"

// Error handling middleware
export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle ApiError (custom error)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      success: false,
    })
  }

  // Handle Syntax Error (Invalid JSON)
  if (err.name === "SyntaxError" && err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON syntax",
    })
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error: any) => error.message)
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    })
  }

  // Handle MongoDB Duplicate Key Error
  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate key error",
      errors: err.keyValue,
    })
  }

  // Handle all other unknown server errors
  return res.status(500).json({
    success: false,
    message: "Something went wrong on the server",
  })
}
