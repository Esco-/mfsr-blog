import mongoose from 'mongoose'
import { beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
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
import { createUser } from '../services/users.js'

let testUser = null
let samplePosts = []

beforeAll(async () => {
  testUser = await createUser({ username: 'dan', password: 'hunter2' })
  samplePosts = [
    { title: 'Learning Redux', author: testUser._id, tags: ['redux'] },
    { title: 'Learn React Hooks', author: testUser._id, tags: ['react'] },
    {
      title: 'Full-Stack React Projects',
      author: testUser._id,
      tags: ['react', 'nodejs'],
    },
    { title: 'Guide to TypeScript', author: testUser._id },
    {
      title: 'Hello Mongoose!',
      author: testUser._id,
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    },
    {
      title: 'A Test Article',
      author: testUser._id,
      contents: 'Another test article written by the test author.',
      tags: ['test', 'last test article'],
    },
  ]
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }

    const createdPost = await createPost(testUser._id, post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
    // We need to explicitly convert the id to a string, because it is an ObjectId object
    expect(String(foundPost.author?._id)).toMatch(String(testUser?._id))
  })

  test('without title should fail', async () => {
    const post = {
      contents: 'Post with no title',
      tags: ['empty'],
    }
    try {
      await createPost(testUser._id, post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(testUser._id, post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })

  test('should notcreate post when author id does not exist', async () => {
    const fakeUserId = '000000000000000000000000'
    const post = { title: 'Orphan post' }
    await expect(createPost(fakeUserId, post)).rejects.toThrow(
      'author not found',
    )
  })
})

let createdSamplePosts = []

beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }

  await updatePost(testUser._id, createdSamplePosts[5]._id, {
    contents: 'Update Single Post',
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
    const posts = await listPostsByAuthor(testUser.username)
    expect(posts.length).toBe(6)
  })

  test('should not be able to filter posts by empty author field', async () => {
    const posts = await listPostsByAuthor()
    expect(posts).toEqual([])
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toBe(1)
  })

  test('tag not found should return empty array', async () => {
    const posts = await listPostsByTag('no-such-tag')
    expect(posts).toEqual([])
  })

  test('empty DB should return empty listAllPosts', async () => {
    await Post.deleteMany({})
    const posts = await listAllPosts()
    expect(posts).toEqual([])
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

  test('should fail for invalid id format', async () => {
    await expect(getPostById('invalid-id')).rejects.toThrow(
      /Cast to ObjectId|Cast to ObjectId failed/,
    )
  })
})

describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      contents: 'Test Update',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.contents).toEqual('Test Update')
  })

  test('Should not update other properties', async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      contents: 'Test Update',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Learning Redux')
  })

  test('should update the updatedAt timestamp', async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      contents: 'Test Update',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exist', async () => {
    const post = await updatePost(testUser._id, '000000000000000000000000', {
      contents: 'Test Update',
    })
    expect(post).toEqual(null)
  })

  test('should fail if the user id does not exist', async () => {
    const post = await updatePost(
      '000000000000000000000000',
      createdSamplePosts[0]._id,
      {
        contents: 'Test Update',
      },
    )
    expect(post).toEqual(null)
  })

  test('should fail for invalid post id format', async () => {
    await expect(
      updatePost(testUser._id, 'invalid-id', { contents: 'x' }),
    ).rejects.toThrow(/Cast to ObjectId|Cast to ObjectId failed/)
  })

  test('should not allow another user to update the post', async () => {
    const otherUser = await createUser({ username: 'other', password: 'pw' })
    const post = await updatePost(otherUser._id, createdSamplePosts[0]._id, {
      contents: 'bad update',
    })
    expect(post).toEqual(null)
  })
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(testUser._id, createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })

  test('should fail if the id does not exist', async () => {
    const result = await deletePost(testUser._id, '000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })

  test('should fail if the user id does not exist', async () => {
    const result = await deletePost(
      '000000000000000000000000',
      createdSamplePosts[0]._id,
    )
    expect(result.deletedCount).toEqual(0)
  })

  test('should fail for invalid id format', async () => {
    await expect(deletePost(testUser._id, 'invalid-id')).rejects.toThrow(
      /Cast to ObjectId|Cast to ObjectId failed/,
    )
  })

  test('should not allow another user to delete the post', async () => {
    const otherUser = await createUser({ username: 'otherdel', password: 'pw' })
    const result = await deletePost(otherUser._id, createdSamplePosts[1]._id)
    expect(result.deletedCount).toEqual(0)
  })
})
