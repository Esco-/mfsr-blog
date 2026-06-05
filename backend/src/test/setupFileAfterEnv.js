import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDatabase } from '../db/init.js'

// load .env for tests and ensure JWT_SECRET exists
dotenv.config()
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'test-secret'

beforeAll(async () => {
  await initDatabase()
})
afterAll(async () => {
  await mongoose.disconnect()
})
