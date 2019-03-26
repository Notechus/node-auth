import winston from 'winston'

// const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
const LOG_LEVEL = 'debug'

const createApplicationLogger = () => {
  const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.splat()
    ),
    transports: [
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/application.log' }),
    ],
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    )
  }

  return logger
}

const logger = createApplicationLogger()

export default logger
