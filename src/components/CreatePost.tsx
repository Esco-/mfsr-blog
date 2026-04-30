import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  useInputWidget as useInput,
  useTextAreaWidget as useTextArea,
} from '../hooks'
import { createPost } from '../api/posts'
import { TextAreaWidget } from './TextAreaWidget'
import { TextInputWidget } from './TextInputWidget'
import { InputButton } from './InputButton.jsx'
import './CreatePost.css'

export function CreatePost() {
  const [titleProps, resetTitle] = useInput('')
  const [authorProps, resetAuthor] = useInput('')
  const [contentProps, resetContents] = useTextArea('')
  const [tagProps, resetTags] = useInput('')
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost({
        title: titleProps.value,
        author: authorProps.value,
        contents: contentProps.value,
        tags: tagProps.value.split(',').map((tag) => tag.trim()),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      resetTitle()
      resetAuthor()
      resetContents()
      resetTags()
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPostMutation.mutate()
  }
  return (
    <section className='create-post'>
      <form onSubmit={handleSubmit} action=''>
        <TextInputWidget
          name='create-title'
          label='Post title'
          {...titleProps}
        />
        <TextInputWidget
          name='create-author'
          label='Post author'
          {...authorProps}
        />
        <TextAreaWidget name='post' label='Post text' {...contentProps} />
        <TextInputWidget
          name='tag-post'
          label='Post tags'
          {...tagProps}
          placeholder='A comma-separated list of tags (eg: react, JavaScript, node)'
        />
        <InputButton
          value={createPostMutation.isPending ? 'Creating...' : 'Create'}
          disabled={!titleProps.value || createPostMutation.isPending}
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
