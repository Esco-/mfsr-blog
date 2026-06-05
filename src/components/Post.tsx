import { jwtDecode } from 'jwt-decode'
import { TagList } from './TagList'
import { usePosts, useAuth } from '../hooks'
import { Icon } from './Icon'
import { User } from './User'
import './Post.css'

type DecodedToken = {
  sub?: string
}

export type PostPayload = {
  title: string
  author?: string
  contents?: string
  tags?: string[]
}

export type Post = PostPayload & {
  _id: number
  updatedAt?: string
  createdAt?: string
}
export type PostProps = Post & {
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
}: PostProps) {
  const { deletePost, setEditId } = usePosts()
  const { token } = useAuth()
  let sub: string | null = null
  if (token) {
    const decoded = jwtDecode<DecodedToken>(token)
    sub = decoded.sub ?? null
  }
  return (
    <li className='post-summary card'>
      <div className='mutations'>
        {sub ? (
          <>
            <button onClick={() => setEditId(_id)}>
              <Icon iconId='edit-icon' />
            </button>
            <button onClick={() => deletePost(_id)}>
              <Icon iconId='trash-icon' />
            </button>
          </>
        ) : null}
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
            Written by <User id={author} />
          </em>
        </div>
      )}
      {!author && <div className='author'></div>}
      {!!tags?.length && <TagList tags={tags} />}
    </li>
  )
}
