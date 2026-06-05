import { useEffect } from 'react'
import { TextAreaWidget } from './TextAreaWidget'
import { TextInputWidget } from './TextInputWidget'
import { InputButton } from './InputButton'
import { usePosts } from '../hooks'
import './CreatePost.css'

export function CreatePost() {
  const {
    post,
    createPost,
    patchPost,
    editId,
    isPending,
    isPatchPending,
    isSuccess,
    isPatchSuccess,
    author,
    setAuthor,
    contents,
    setContents,
    tags,
    setTags,
    title,
    setTitle,
    setEditId,
  } = usePosts()

  const tagsToArr = (tags: string): string[] => {
    let strArr: string[] = []

    if (tags.trim().includes(',')) {
      strArr = tags.split(',').map((tag) => tag.trim())
    } else if (tags.trim()) {
      strArr = [tags.trim()]
    } else {
      strArr = ['']
    }
    return strArr
  }
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editId) {
      createPost({
        title: title,
        author: author,
        contents: contents,
        tags: tagsToArr(tags),
      })
    } else {
      patchPost({
        _id: editId,
        title: title,
        author: author,
        contents: contents,
        tags: tagsToArr(tags),
      })
    }
    setTitle('')
    setAuthor('')
    setContents('')
    setTags('')
    setEditId(null)
  }

  useEffect(() => {
    if (editId) {
      setTitle(post?.title ? post.title : '')
      setAuthor(post?.author ? post.author : '')
      setContents(post?.contents ? post.contents : '')
      setTags(post?.tags ? post.tags.join(', ') : '')
    }
  }, [editId, post])

  return (
    <section className='create-post'>
      <div className='head'>
        <h2>Create New Post</h2>
      </div>
      <form onSubmit={handleSubmit} action=''>
        <TextInputWidget
          name='create-title'
          label='Post title *'
          value={title}
          onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
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
        {editId ? (
          <InputButton
            value={isPatchPending ? 'Updating...' : 'Update'}
            disabled={!title || isPatchPending}
          />
        ) : (
          <InputButton
            value={isPending ? 'Creating...' : 'Create'}
            disabled={!title || isPending}
          />
        )}
      </form>
      <small>* marks a required field</small>
      {isSuccess ? (
        <div className='success'>
          <strong>
            <em>Post created successfully!</em>
          </strong>
        </div>
      ) : null}
      {isPatchSuccess ? (
        <div className='success'>
          <strong>
            <em>Post updated successfully!</em>
          </strong>
        </div>
      ) : null}
    </section>
  )
}
