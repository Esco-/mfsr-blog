import { Tag, type Props as TagProps } from './Tag'
import './TagList.css'

export type Props = {
  tags: TagProps[]
}

export function TagList({ tags = [] }: Props) {
  return (
    !!tags.length && (
      <ul className='tags'>
        {tags.map(({ title }, i) => (
          <Tag key={i} title={title} />
        ))}
      </ul>
    )
  )
}
