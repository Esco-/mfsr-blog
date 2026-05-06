import { useEffect } from 'react'
import { TextAreaWidget } from './TextAreaWidget'
import { TextInputWidget } from './TextInputWidget'
import { InputButton } from './InputButton.jsx'
import { usePosts } from '../hooks'
import './CreatePost.css'

export function CreatePost() {
  const {
    post,
    createPost,
    editId,
    isPending,
    isSuccess,
    author,
    setAuthor,
    contents,
    setContents,
    tags,
    setTags,
    title,
    setTitle,
  } = usePosts()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPost({
      title: title,
      author: author,
      contents: contents,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .join(', '),
    })
    setTitle('')
    setAuthor('')
    setContents('')
    setTags('')
  }

  useEffect(() => {
    if (editId) {
      setTitle(post?.title ? post.title : '')
      setAuthor(post?.author ? post.author : '')
      setContents(post?.contents ? post.contents : '')
      setTags(post?.tags ? post.tags.join(', ') : [])
    }
  })

  return (
    <section className='create-post'>
      <div className='head'>
        <h2>Create New Post</h2>
      </div>
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
          value={isPending ? 'Creating...' : 'Create'}
          disabled={!title || isPending}
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
