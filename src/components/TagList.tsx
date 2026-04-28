import { Tag } from './Tag'
import './TagList.css'

export type Props = {
  tags: string[]
}

export function TagList({ tags = [] }: Props) {
  return (
    !!tags.length && (
      <ul className='tags'>
        {tags.map((tag, i) => (
          <Tag key={i} title={tag} />
        ))}
      </ul>
    )
  )
}
