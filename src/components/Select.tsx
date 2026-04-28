import { Option } from './Option'
import './Select.css'

type Props = {
  name?: string
  id?: string
  fields: string[]
  value?: string
  onSelectChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
export function Select({
  name,
  id,
  fields = [],
  value,
  onSelectChange = (f) => f,
}: Props) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => onSelectChange(e)}
    >
      {fields.map((field) => (
        <Option key={field} field={field} />
      ))}
    </select>
  )
}
