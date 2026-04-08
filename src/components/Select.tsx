import { Option } from './Option'

type Props = {
  name?: string
  id?: string
  fields: string[]
}
export function Select({ name, id, fields = [] }: Props) {
  return (
    <select id={id} name={name}>
      {fields.map((field) => (
        <Option key={field} field={field} />
      ))}
    </select>
  )
}
