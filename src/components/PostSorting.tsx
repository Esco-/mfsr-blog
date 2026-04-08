import { SelectFieldsWidget } from './SelectFieldsWidget'
import './PostSorting.css'

type Props = {
  sortDate?: string[]
  sortOrder?: string[]
}

const fieldsDate = ['createdAt', 'updatedAt']
const fieldsOrder = ['ascending', 'descending']

export function PostSorting({
  sortDate = fieldsDate,
  sortOrder = fieldsOrder,
}: Props) {
  return (
    <>
      <div className='post-sorting-date'>
        <SelectFieldsWidget name='sortBy' label='Sort by' fields={sortDate} />
      </div>
      <div className='post-sorting-order'>
        <SelectFieldsWidget
          name='sortOrder'
          label='Sort order'
          fields={sortOrder}
        />
      </div>
    </>
  )
}
