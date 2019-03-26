import logger from './logger'
import { errorResponse } from './functions'
import { decode } from './jwt'

const key = 'asdsadsadasdasddadsasd'
const UNPROTECTED_PATHS = [{ method: 'POST', path: '/users' }]
const PREFIX_LENGTH = 'Bearer '.length

const decodeToken = request => {
  const authorization = request.header('Authorization')
  if (authorization) {
    const encodedToken = authorization.substr(PREFIX_LENGTH)
    if (encodedToken) {
      return decode(encodedToken)
    }
  }

  return null
}

export const authMiddleware = (req, res, next) => {
  logger.info('Received request', req)
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''
    if (token) {
      const user = verifyToken(token)
      // @ts-ignore
      req.user = user
      user ? next() : errorResponse(res, 403, 'Unauthorized')
    } else {
      errorResponse(res, 'Unauthorized')
    }
  } catch (err) {
    logger.error('Error while trying to authorize request', req, err)
    errorResponse(res, 403, 'Unauthorized')
  }
  next()
}

const verifyToken = async token => {
  logger.debug('Verifying token ', token)
}
