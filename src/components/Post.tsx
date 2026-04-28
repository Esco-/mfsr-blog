import { TagList } from './TagList'
import './Post.css'

export type Props = {
  title: string
  contents?: string
  author?: string
  tags?: string[]
  updatedAt?: string
  createdAt?: string
}

export function Post({
  title,
  contents,
  author,
  tags = [],
  updatedAt,
  createdAt,
}: Props) {
  return (
    <li className='post-summary card'>
      <h3 className='title'>{title}</h3>
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
