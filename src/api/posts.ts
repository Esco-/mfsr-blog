import { type Post, type PostPayload } from '../components/Post'

const parseJson = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API error ${res.status}: ${body}`)
  }
  return res.json() as Promise<T>
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL as string
if (!BASE_URL) throw new Error('Missing VITE_BACKEND_URL')

export const getPosts = async (
  queryParams?: Record<string, string>,
): Promise<Post[]> => {
  const queryString = queryParams ? `?${new URLSearchParams(queryParams)}` : ''
  const res = await fetch(`${BASE_URL}/posts${queryString}`)
  return await parseJson(res)
}

export const createPost = async (
  token: string | null,
  post: PostPayload,
): Promise<Post> => {
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  return await parseJson(res)
}

export const patchPost = async (
  token: string | null,
  post: Partial<Post>,
): Promise<Post> => {
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${BASE_URL}/posts/${post._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  return await parseJson(res)
}

export const deletePost = async (
  token: string | null,
  id: number,
): Promise<void> => {
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
}

export const getPost = async ({
  editId,
}: {
  editId: number | null
}): Promise<Post | null> => {
  if (!editId) {
    return null
  }
  const res = await fetch(`${BASE_URL}/posts/${editId}`, {
    method: 'GET',
  })
  return await parseJson(res)
}
