import { usePosts } from '../hooks'
import './Tag.css'

export type Props = {
  title: string
}

export function Tag({ title }: Props) {
  const { setTagsFilter } = usePosts()
  return (
    <li className='tag'>
      <button title={title} onClick={() => setTagsFilter(title)}>
        {title}
      </button>
    </li>
  )
}
