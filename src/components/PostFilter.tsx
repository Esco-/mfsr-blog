import { TextInputWidget } from './TextInputWidget'
import './PostFilter.css'

type Props = {
  field: string
  value?: string
  onFilterChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PostFilter({ field, value, onFilterChange }: Props) {
  return (
    <div className='post-filter'>
      <TextInputWidget
        name={`filter-${field}`}
        label={`Filter by ${field}:`}
        value={value}
        onTextInputWidgetChange={onFilterChange}
      />
    </div>
  )
}
