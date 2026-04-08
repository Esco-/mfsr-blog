import { TagList } from './TagList'
import './Post.css'

export type Props = {
  title: string
  contents?: string
  author?: string
  tags?: string[]
}

export function Post({ title, contents, author, tags = [] }: Props) {
  return (
    <li className='post-summary card'>
      <h3 className='title'>{title}</h3>
      {contents && <div className='body'>{contents}</div>}
      {author && (
        <div className='author'>
          <em>
            Written by <strong>{author}</strong>
          </em>
        </div>
      )}
      {!!tags?.length && <TagList tags={tags} />}
    </li>
  )
}
