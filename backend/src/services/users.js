import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models/user.js'

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}

async function listUsers(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await User.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllUsers(options) {
  return await listUsers({}, options)
}

export async function getUserById(userId) {
  return await User.findById(userId)
}

export async function updateUser(userId, { username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await User.findOneAndUpdate(
    { _id: userId },
    { $set: { username, password: hashedPassword } },
    { returnDocument: 'after' },
  )
}

export async function deleteUser(userId) {
  return await User.deleteOne({ _id: userId })
}
