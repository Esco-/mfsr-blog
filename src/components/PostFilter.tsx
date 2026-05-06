import { TextInputWidget } from './TextInputWidget'
import { usePosts } from '../hooks'
import './PostFilter.css'

type Props = {
  field: string
  value?: string
  placeholder?: string
  onFilterChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PostFilter({ field, placeholder }: Props) {
  const { authorFilter, setAuthorFilter } = usePosts()
  return (
    <div className='post-filter'>
      <TextInputWidget
        name={`filter-${field}`}
        label={`Filter by ${field}:`}
        value={authorFilter}
        placeholder={placeholder}
        onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAuthorFilter(e.target.value)
        }
      />
    </div>
  )
}
