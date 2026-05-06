export type PostPayload = {
  title: string
  author?: string
  contents?: string
  tags?: string
}

export type Post = PostPayload & {
  id: number
  createdAt: string
  updatedAt: string
}

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

export const createPost = async (post: PostPayload): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return await parseJson(res)
}

export const patchPost = async (
  id: number,
  post: Partial<PostPayload>,
): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return await parseJson(res)
}

export const deletePost = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
}

export const getPost = async ({
  editId,
}: {
  editId: number | null
}): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${editId}`, {
    method: 'GET',
  })
  return await parseJson(res)
}
