import { SelectFieldsWidget } from './SelectFieldsWidget'
import './PostSorting.css'

type Props = {
  sortByFields?: string[]
  sortOrderFields?: string[]
  sortByValue?: string
  sortOrderValue?: string
  onByChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onOrderChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const fieldsBy = ['createdAt', 'updatedAt']
const fieldsOrder = ['ascending', 'descending']

export function PostSorting({
  sortByFields = fieldsBy,
  sortOrderFields = fieldsOrder,
  sortByValue,
  sortOrderValue,
  onByChange,
  onOrderChange,
}: Props) {
  return (
    <>
      <div className='post-sorting-date'>
        <SelectFieldsWidget
          name='sortBy'
          label='Sort by'
          fields={sortByFields}
          value={sortByValue}
          onSelectWidgetChange={onByChange}
        />
      </div>
      <div className='post-sorting-order'>
        <SelectFieldsWidget
          name='sortOrder'
          label='Sort order'
          fields={sortOrderFields}
          value={sortOrderValue}
          onSelectWidgetChange={onOrderChange}
        />
      </div>
    </>
  )
}
