import { usePosts } from '../hooks'
import './Tag.css'

export type Props = {
  title: string
}

export function Tag({ title }: Props) {
  const { setTag } = usePosts()
  return (
    <li className='tag'>
      <button title={title} onClick={() => setTag(title)}>
        {title}
      </button>
    </li>
  )
}
