import { SelectFieldsWidget } from './SelectFieldsWidget'
import { usePosts } from '../hooks'
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
}: Props) {
  const { sortBy, setSortBy, sortOrder, setSortOrder } = usePosts()
  return (
    <>
      <div className='post-sorting-date'>
        <SelectFieldsWidget
          name='sortBy'
          label='Sort by'
          fields={sortByFields}
          value={sortBy}
          onSelectWidgetChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(e.target.value)
          }
        />
      </div>
      <div className='post-sorting-order'>
        <SelectFieldsWidget
          name='sortOrder'
          label='Sort order'
          fields={sortOrderFields}
          value={sortOrder}
          onSelectWidgetChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortOrder(e.target.value)
          }
        />
      </div>
    </>
  )
}
