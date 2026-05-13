import mongoose, { Schema } from 'mongoose'

const postSchema = Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  { timestamps: true },
)

export const Post = mongoose.model('post', postSchema)
