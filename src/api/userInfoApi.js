import express from 'express'
import logger from '../utils/logger'

const userInfoApi = express()

userInfoApi.get('/:username', (request, response) => {
  const username = ''
  logger.info(`Trying to get ${username} user data`)
})

export default userInfoApi
