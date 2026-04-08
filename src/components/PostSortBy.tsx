import { SelectFieldsWidget } from './SelectFieldsWidget'
import './PostSorting.css'

type Props = {
  fields: string[]
}

export function PostSortBy({ fields = [] }: Props) {
  return <SelectFieldsWidget name='sortBy' label='Sort by:' fields={fields} />
}
