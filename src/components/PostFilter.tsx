import { TextInputWidget } from './TextInputWidget'
import './PostFilter.css'

type Props = {
  field: string
}

export function PostFilter({ field }: Props) {
  return (
    <div className='post-filter'>
      <TextInputWidget name={`filter-${field}`} label={`Filter by ${field}:`} />
    </div>
  )
}
