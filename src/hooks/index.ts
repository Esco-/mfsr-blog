import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { type Post, type PostPayload } from '../components/Post'

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  return [
    {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialValue),
  ]
}

export const useInputWidget = (
  initialValue: string,
): [
  {
    value: string
    onTextInputWidgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  },
  () => void,
] => {
  const [value, setValue] = useState<string>(initialValue)
  return [
    {
      value,
      onTextInputWidgetChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialValue),
  ]
}

export const useTextAreaWidget = (
  initialValue: string,
): [
  {
    value: string
    onTextAreaWidgetChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  },
  () => void,
] => {
  const [value, setValue] = useState<string>(initialValue)
  return [
    {
      value,
      onTextAreaWidgetChange: (e) => setValue(e.target.value),
    },
    () => setValue(initialValue),
  ]
}

type PostContextType = {
  posts: Post[]
  post: Post | null
  isLoading: boolean
  isSuccess: boolean
  isPatchSuccess: boolean
  isPending: boolean
  isPatchPending: boolean
  isDelSuccess: boolean
  isDelPending: boolean
  error: unknown
  createPost: (post: PostPayload) => Promise<Post>
  patchPost: (post: Post) => Promise<Post>
  deletePost: (id: number) => Promise<void>
  author: string
  authorFilter: string
  title: string
  contents: string
  sortBy: string
  sortOrder: string
  tags: string
  tagsFilter: string
  editId: number | null
  setAuthor: Dispatch<SetStateAction<string>>
  setAuthorFilter: Dispatch<SetStateAction<string>>
  setTitle: Dispatch<SetStateAction<string>>
  setContents: Dispatch<SetStateAction<string>>
  setSortBy: Dispatch<SetStateAction<string>>
  setSortOrder: Dispatch<SetStateAction<string>>
  setTags: Dispatch<SetStateAction<string>>
  setTagsFilter: Dispatch<SetStateAction<string>>
  setEditId: Dispatch<SetStateAction<number | null>>
}

type AuthContextType = {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
  logout: () => void
}

export const PostContext = createContext<PostContextType | undefined>(undefined)

export const usePosts = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider')
  }
  return context
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }
  return context
}
