import { TagList } from './TagList'
import { usePosts } from '../hooks'
import { Icon } from './Icon'
import './Post.css'

export type Props = {
  _id: number
  title: string
  contents?: string
  author?: string
  tags?: string[]
  updatedAt?: string
  createdAt?: string
  children?: React.ReactElement
}

export function Post({
  _id,
  children,
  title,
  contents,
  author,
  tags,
  updatedAt,
  createdAt,
}: Props) {
  const { deletePost, setEditId } = usePosts()
  return (
    <li className='post-summary card'>
      <div className='mutations'>
        <button onClick={() => setEditId(_id)}>
          <Icon iconId='edit-icon' />
        </button>
        <button onClick={() => deletePost(_id)}>
          <Icon iconId='trash-icon' />
        </button>
      </div>
      <h3 className='title'>{title}</h3>
      {children}
      {updatedAt && createdAt && (
        <div className='updated'>
          <small>{new Date(updatedAt).toLocaleDateString()} | </small>
          <small>{new Date(updatedAt).toLocaleTimeString()}</small>
        </div>
      )}
      {contents && <div className='body'>{contents}</div>}
      {!contents && <div className='body'></div>}
      {author && (
        <div className='author'>
          <em>
            Written by <strong>{author}</strong>
          </em>
        </div>
      )}
      {!author && <div className='author'></div>}
      {!!tags?.length && <TagList tags={tags} />}
    </li>
  )
}
