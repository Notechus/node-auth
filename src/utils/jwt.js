import logger from './logger'
import jwa from 'jwa'
import jwt from 'jsonwebtoken'

const APPLICATION_ID = 'abc'
const publicKey = process.env.PUBLIC_KEY

export const decode = token => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      logger.warn('Invalid token. Invalid length: ', parts.length)
      return null
    }

    const header = JSON.parse(Buffer.from(parts[0], 'base64'))
    const payload = Buffer.from(parts[1], 'base64')

    if (header.kid !== APPLICATION_ID) {
      return null
    }

    const schema = header.alg
    let verified = false

    switch (schema) {
      case 'RS256':
        verified = jwa(schema).verify(parts[0] + '.' + parts[1], parts[2], publicKey)
        break
      case 'RS384':
        verified = jwa(schema).verify(parts[0] + '.' + parts[1], parts[2], publicKey)
        break
      case 'RS512':
        verified = jwa(schema).verify(parts[0] + '.' + parts[1], parts[2], publicKey)
        break
      default:
        verified = false
    }

    if (!verified) {
      return null
    }

    const decodedToken = JSON.parse(payload)
    const now = Math.round(new Date().getTime() / 1000)

    if (decodedToken.exp && decodedToken.exp < now) {
      return null
    }

    return decodedToken
  } catch (e) {
    logger.error('Could not decode JWT token ', token)
    return null
  }
}

const verify = token => {
  const verified = jwt.verify(token, key)
}
