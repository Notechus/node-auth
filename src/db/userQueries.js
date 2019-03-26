import User from './models/user'
import logger from '../utils/logger'

export const createNewUser = async user => {
  logger.info('Creating new user ', user.username)
  const newUser = new User({
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    active: true,
    creationTime: new Date(),
    userType: 1,
  })
  return await newUser.save()
}

export const fetchUserByUsername = async username => {
  logger.info(`Fetching ${username} user data`)
  const user = await User.findOne({ username }).exec()
  return {
    userId: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    creationTime: user.creationTime,
    type: user.userType,
    active: user.active,
  }
}
