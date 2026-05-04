import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { type Props as PostProps } from '../components/Post'

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
  posts: PostProps[]
  isLoading: boolean
  isSuccess: boolean
  isPending: boolean
  error: unknown
  createPost: (post: PostProps) => Promise<void>
  author: string
  sortBy: string
  sortOrder: string
  tag: string
  setAuthor: Dispatch<SetStateAction<string>>
  setSortBy: Dispatch<SetStateAction<string>>
  setSortOrder: Dispatch<SetStateAction<string>>
  setTag: Dispatch<SetStateAction<string>>
}

export const PostContext = createContext<PostContextType | undefined>(undefined)

export const usePosts = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider')
  }
  return context
}
