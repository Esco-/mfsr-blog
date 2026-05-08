import { useState, type ReactNode } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type PostPayload } from '../components/Post'
import { PostContext } from '../hooks'
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  patchPost,
} from '../api/posts'

type PostProviderProps = {
  children: ReactNode
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [author, setAuthor] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [tags, setTags] = useState('')
  const [tagsFilter, setTagsFilter] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts', { authorFilter, sortBy, sortOrder, tagsFilter }],
    queryFn: () => getPosts({ authorFilter, sortBy, sortOrder, tagsFilter }),
  })

  const postQuery = useQuery({
    queryKey: ['post', { editId }],
    queryFn: () => getPost({ editId }),
    enabled: !!editId,
  })

  const createPostMutation = useMutation({
    mutationFn: (post: PostPayload) => createPost(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const patchPostMutation = useMutation({
    mutationFn: (post: PostPayload) => patchPost(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  return (
    <PostContext.Provider
      value={{
        posts: postsQuery.data ?? [],
        post: postQuery.data ?? null,
        isLoading: postsQuery.isLoading,
        error: postsQuery.error,
        createPost: createPostMutation.mutateAsync,
        isSuccess: createPostMutation.isSuccess,
        isPending: createPostMutation.isPending,
        patchPost: patchPostMutation.mutateAsync,
        isPatchSuccess: patchPostMutation.isSuccess,
        isPatchPending: patchPostMutation.isPending,
        deletePost: deletePostMutation.mutateAsync,
        isDelSuccess: deletePostMutation.isSuccess,
        isDelPending: deletePostMutation.isPending,
        author,
        authorFilter,
        sortBy,
        sortOrder,
        tags,
        tagsFilter,
        title,
        contents,
        editId,
        setAuthor,
        setAuthorFilter,
        setSortBy,
        setSortOrder,
        setTags,
        setTagsFilter,
        setTitle,
        setContents,
        setEditId,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
