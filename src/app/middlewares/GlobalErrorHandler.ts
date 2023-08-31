import { NextFunction, Response, request } from 'express'

const globalErrorHandler = (
  err,
  req: request,
  res: Response,
  next: NextFunction,
) => {
  next()
}

export default globalErrorHandler
