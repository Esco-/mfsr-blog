import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
import { User } from '../db/models/user'
import {
  createUser,
  deleteUser,
  getUserInfoById,
  listAllUsers,
  loginUser,
  updateUser,
} from '../services/users'

let sampleUsers = []

beforeAll(async () => {
  sampleUsers = [
    { username: 'danny', password: 'hunter2' },
    { username: 'daniella', password: 'huntress3' },
    { username: 'paul', password: 'munene2' },
    { username: 'tony', password: 'tonitone' },
    { username: 'mikel', password: 'arteta' },
  ]
})

describe('creating users', () => {
  test('with all parameters should succeed', async () => {
    const user = { username: 'tester', password: 'testpwd12345' }
    const userWithHashedPwd = {
      username: 'tester',
    }

    const createdUser = await createUser(user)
    expect(createdUser._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundUser = await User.findById(createdUser._id)
    expect(foundUser).toEqual(expect.objectContaining(userWithHashedPwd))
    expect(foundUser.password).not.toBe(user.password)
    expect(await bcrypt.compare(user.password, foundUser.password)).toBe(true)
    expect(foundUser.createdAt).toBeInstanceOf(Date)
    expect(foundUser.updatedAt).toBeInstanceOf(Date)
  })

  test('without username should fail', async () => {
    await expect(
      createUser({ password: 'testpwd12345' }),
    ).rejects.toBeInstanceOf(mongoose.Error.ValidationError)
  })

  test('with duplicate username should fail', async () => {
    const user = { username: 'tester', password: 'testpwd12345' }
    await createUser(user)
    await expect(createUser(user)).rejects.toThrow(
      /duplicate key error collection/,
    )
  })

  test('without password should fail', async () => {
    await expect(createUser({ username: 'tester' })).rejects.toThrow(
      /data and salt arguments required/,
    )
  })
})

describe('logging in users', () => {
  test('with valid credentials should succeed', async () => {
    const user = { username: 'tester', password: 'testpwd12345' }
    await createUser(user)
    const token = await loginUser(user)
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(0)
  })

  test('with invalid username should fail', async () => {
    await expect(
      loginUser({ username: 'missing', password: 'whatever' }),
    ).rejects.toThrow('invalid username!')
  })

  test('with invalid password should fail', async () => {
    const user = { username: 'tester', password: 'testpwd12345' }
    await createUser(user)
    await expect(
      loginUser({ username: 'tester', password: 'wrongpwd' }),
    ).rejects.toThrow('invalid password!')
  })
})

let createdSampleUsers = []

beforeEach(async () => {
  await User.init()
  await User.deleteMany({})
  createdSampleUsers = []
  for (const user of sampleUsers) {
    const createdUser = new User(user)
    createdUser.password = await bcrypt.hash(createdUser.password, 10)
    createdSampleUsers.push(await createdUser.save())
  }
})

describe('listing users', () => {
  test('should return all users', async () => {
    const users = await listAllUsers()
    expect(users.length).toEqual(createdSampleUsers.length)
  })

  test('should return users sorted by creation date descending by default', async () => {
    const users = await listAllUsers()
    const sortedSampleUsers = createdSampleUsers.toSorted(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(users.map((user) => user.createdAt)).toEqual(
      sortedSampleUsers.map((user) => user.createdAt),
    )
  })

  test('should take into account provided sorting options', async () => {
    const users = await listAllUsers({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSampleUsers = createdSampleUsers.toSorted(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(users.map((user) => user.updatedAt)).toEqual(
      sortedSampleUsers.map((user) => user.updatedAt),
    )
  })
})

describe("getting a user's info", () => {
  test("should return the user's username", async () => {
    const user = await getUserInfoById(createdSampleUsers[0]._id)
    expect(user).toEqual({ username: createdSampleUsers[0].username })
  })

  test('should not expose password', async () => {
    const user = await getUserInfoById(createdSampleUsers[0]._id)
    expect(user).not.toHaveProperty('password')
  })

  test('should fail if id does not exist', async () => {
    const user = await getUserInfoById('000000000000000000000000')
    expect(user).toEqual(null)
  })

  test('should fail for invalid id format', async () => {
    await expect(getUserInfoById('invalid-id')).rejects.toThrow(
      /user not found:/,
    )
  })
})

describe('updating a user', () => {
  test('`username` should update the specified property', async () => {
    await updateUser(createdSampleUsers[0]._id, {
      username: 'testuser',
      password: createdSampleUsers[0].password,
    })
    const updatedUser = await User.findById(createdSampleUsers[0]._id)
    expect(updatedUser.username).toBe('testuser')
  })

  test('`password` should update the specified property', async () => {
    await updateUser(createdSampleUsers[0]._id, {
      username: createdSampleUsers[0]._id,
      password: 'testpswd12345',
    })
    const updatedUser = await User.findById(createdSampleUsers[0]._id)
    expect(updatedUser.password).not.toBe(createdSampleUsers[0].password)
  })

  test('should update the updatedAt timestamp', async () => {
    await updateUser(createdSampleUsers[0]._id, {
      username: 'testuser',
      password: 'testpswd12345',
    })
    const updatedUser = await User.findById(createdSampleUsers[0]._id)
    expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(
      createdSampleUsers[0].updatedAt.getTime(),
    )
  })

  test('should fail if the `id` does not exist', async () => {
    const user = await updateUser('000000000000000000000000', {
      username: 'testuser',
      password: 'testpswd12345',
    })
    expect(user).toEqual(null)
  })

  test('should fail for invalid id format', async () => {
    await expect(
      updateUser('invalid-id', {
        username: 'testuser',
        password: 'testpswd12345',
      }),
    ).rejects.toThrow(/Cast to ObjectId|Cast to ObjectId failed/)
  })
})

describe('deleting a user', () => {
  test('should remove the user from the database', async () => {
    const result = await deleteUser(createdSampleUsers[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedUser = await User.findById(createdSampleUsers[0]._id)
    expect(deletedUser).toEqual(null)
  })

  test('should fail if the `id` does not exist', async () => {
    const result = await deleteUser('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })

  test('should fail for invalid id format', async () => {
    await expect(deleteUser('invalid-id')).rejects.toThrow(
      /Cast to ObjectId|Cast to ObjectId failed/,
    )
  })
})
