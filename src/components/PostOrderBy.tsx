import { SelectFieldsWidget } from './SelectFieldsWidget'
import './PostSorting.css'

type Props = {
  fields: string[]
}

export function PostOrderBy({ fields = [] }: Props) {
  return (
    <SelectFieldsWidget name='sortOrder' label='Sort Order:' fields={fields} />
  )
}
