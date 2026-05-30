import mongoose from 'mongoose'
import { beforeEach, describe, expect, test } from '@jest/globals'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

const AUTHOR_ID = new mongoose.Types.ObjectId()
const TEST_AUTHOR_ID = new mongoose.Types.ObjectId()

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: AUTHOR_ID,
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })
  test('without title should fail', async () => {
    const post = {
      author: AUTHOR_ID,
      contents: 'Post with no title',
      tags: ['empty'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })
  test('without author should fail', async () => {
    const post = {
      title: 'No Author',
      contents: 'Post with no author',
      tags: ['empty'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`author` is required')
    }
  })
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
      author: AUTHOR_ID,
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

const samplePosts = [
  { title: 'Learning Redux', author: AUTHOR_ID, tags: ['redux'] },
  { title: 'Learn React Hooks', author: AUTHOR_ID, tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: AUTHOR_ID,
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript', author: AUTHOR_ID },
  {
    title: 'Hello Mongoose!',
    author: AUTHOR_ID,
    contents: 'This post is stored in a MongoDB database using Mongoose.',
    tags: ['mongoose', 'mongodb'],
  },
  {
    title: 'A Test Article',
    author: TEST_AUTHOR_ID,
    contents: 'Another test article written by the test author.',
    tags: ['test', 'last test article'],
  },
]

let createdSamplePosts = []
beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }

  await updatePost(createdSamplePosts[5]._id, {
    author: TEST_AUTHOR_ID,
  })
  createdSamplePosts[5] = await Post.findById(createdSamplePosts[5]._id)
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })
  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.toSorted(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })
  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.toSorted(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })
  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor(AUTHOR_ID)
    expect(posts.length).toBe(5)
  })
  test('should not be able to filter posts by empty author field', async () => {
    try {
      await listPostsByAuthor()
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.CastError)
      expect(err.message).toContain('Cast to ObjectId failed')
    }
  })
  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toBe(1)
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })
  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: TEST_AUTHOR_ID,
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toEqual(TEST_AUTHOR_ID)
  })
  test('Should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: TEST_AUTHOR_ID,
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Learning Redux')
  })
  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: TEST_AUTHOR_ID,
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })
  test('should fail if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: TEST_AUTHOR_ID,
    })
    expect(post).toEqual(null)
  })
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })
  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
