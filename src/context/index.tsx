import { useState, type ReactNode } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type Props as PostProps } from '../components/Post'
import { PostContext } from '../hooks'
import { getPosts, createPost } from '../api/posts'

type PostProviderProps = {
  children: ReactNode
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [tag, setTag] = useState('')

  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder, tag }],
    queryFn: () => getPosts({ author, sortBy, sortOrder, tag }),
  })

  const createPostMutation = useMutation({
    mutationFn: (post: PostProps) => createPost(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  return (
    <PostContext.Provider
      value={{
        posts: postsQuery.data ?? [],
        isLoading: postsQuery.isLoading,
        error: postsQuery.error,
        createPost: createPostMutation.mutateAsync,
        isSuccess: createPostMutation.isSuccess,
        isPending: createPostMutation.isPending,
        author,
        sortBy,
        sortOrder,
        tag,
        setAuthor,
        setSortBy,
        setSortOrder,
        setTag,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
