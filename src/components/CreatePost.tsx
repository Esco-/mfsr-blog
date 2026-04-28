import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'
import { TextAreaWidget } from './TextAreaWidget'
import { TextInputWidget } from './TextInputWidget'
import { InputButton } from './InputButton.jsx'
import './CreatePost.css'

export function CreatePost() {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [contents, setContents] = useState<string>('')
  const [tags, setTags] = useState<string | string[]>([])
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents, tags }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
      setAuthor('')
      setContents('')
      setTags([])
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    tags.length && setTags(tags.split(',').map((tag) => tag.trim()))
    createPostMutation.mutate()
  }
  return (
    <section className='create-post'>
      <form onSubmit={handleSubmit} action=''>
        <TextInputWidget
          name='create-title'
          label='Post title'
          value={title}
          onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <TextInputWidget
          name='create-author'
          label='Post author'
          value={author}
          onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAuthor(e.target.value)
          }
        />
        <TextAreaWidget
          name='post'
          label='Post text'
          value={contents}
          onTextAreaWidgetChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContents(e.target.value)
          }
        />
        <TextInputWidget
          name='tag-post'
          label='Post tags'
          value={tags}
          onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value)
          }
          placeholder='A comma-separated list of tags (eg: react, JavaScript, node)'
        />
        <InputButton
          value={createPostMutation.isPending ? 'Creating...' : 'Create'}
          disabled={!title || createPostMutation.isPending}
        />
      </form>
      {createPostMutation.isSuccess ? (
        <div className='success'>
          <strong>
            <em>Post created successfully!</em>
          </strong>
        </div>
      ) : null}
    </section>
  )
}
