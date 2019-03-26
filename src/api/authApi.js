import express from 'express'
import logger from '../utils/logger'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/functions'
import {} from '../db/userQueries'

const key = 'asdsadsadasdasddadsasd'
const authApi = express()

const createUserEndpoint = async (request, response) => {
  logger.info('Creating new user from request')
}

const loginEndpoint = async (request, response) => {
  // 1. fetch user by username
  // 2. match password
  // 3. add token to sessions ( for revoke mechanism)
  // 4. return response
  logger.debug('Logging user %s', request.body)
  try {
    const { username, password } = request.body
    logger.info('Received user data', username, password)
    const user = {}

    const passwordMatching = true || (await bcrypt.compare(password, user.password))
    const isMatch = username === user.username && passwordMatching
    if (isMatch) {
      logger.info('User data matching, generating token')
      const token = jwt.sign({ username: 'Notechus' }, key)
      logger.debug('Generated token', token)
      response.status(200).json({
        userId: '1',
        firstName: 'Sebastian',
        lastName: 'Paulus',
        email: 'sebastian.paulus@volvo.com',
        accessToken: token,
      })
    } else {
      errorResponse(response, 400, 'Invalid username or password')
    }
  } catch (err) {
    logger.error('There was an error ', err)
    errorResponse(response, 500, err.message)
  }
}

authApi.post('/login', loginEndpoint)

export default authApi
