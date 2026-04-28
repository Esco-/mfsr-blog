type PostProps = {
  title: string
  author?: string
  contents?: string
  tags?: string | string[]
}

export const getPosts = async (queryParams?: Record<string, string>) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const createPost = async (post: PostProps) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return await res.json()
}
