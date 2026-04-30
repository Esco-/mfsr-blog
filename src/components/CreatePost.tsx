import {
  useInputWidget as useInput,
  useTextAreaWidget as useTextArea,
} from '../hooks'
import { TextAreaWidget } from './TextAreaWidget'
import { TextInputWidget } from './TextInputWidget'
import { InputButton } from './InputButton.jsx'
import { usePosts } from '../hooks'
import './CreatePost.css'

export function CreatePost() {
  const [titleProps, resetTitle] = useInput('')
  const [authorProps, resetAuthor] = useInput('')
  const [contentProps, resetContents] = useTextArea('')
  const [tagProps, resetTags] = useInput('')
  const { createPost, isPending, isSuccess } = usePosts()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPost({
      title: titleProps.value,
      author: authorProps.value,
      contents: contentProps.value,
      tags: tagProps.value.split(',').map((tag) => tag.trim()),
    })
    resetTitle()
    resetAuthor()
    resetContents()
    resetTags()
  }
  return (
    <section className='create-post'>
      <div className='head'>
        <h2>Create New Post</h2>
      </div>
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
          value={isPending ? 'Creating...' : 'Create'}
          disabled={!titleProps.value || isPending}
        />
      </form>
      {isSuccess ? (
        <div className='success'>
          <strong>
            <em>Post created successfully!</em>
          </strong>
        </div>
      ) : null}
    </section>
  )
}
