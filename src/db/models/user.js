import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const user = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
    email: { type: String, unique: true },
    creationTime: Date,
    active: Boolean,
    userType: Number,
  },
  { timestamps: true }
)

user.pre('save', next => {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.hash(user.password, 10).then(password => {
    user.password = password
    next()
  })
})

export default mongoose.model('User', user)
