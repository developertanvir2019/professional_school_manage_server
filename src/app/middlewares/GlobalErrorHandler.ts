import { NextFunction, Response, Request } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/Error'
import handleValidationError from '../../errors/handleValidationError'
import mongoose from 'mongoose'

const globalErrorHandler = (
  err: mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : '',
  })

  next()
}

export default globalErrorHandler
