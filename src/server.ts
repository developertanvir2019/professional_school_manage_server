import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, error_logger } from './shared/logger'
import { Server } from 'http'

async function main() {
  let server: Server

  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected successfully')
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    error_logger.error('Failed to connect to database', error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled rejection is detected .we are closing the server')
    if (server) {
      server.close(() => {
        error_logger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()
