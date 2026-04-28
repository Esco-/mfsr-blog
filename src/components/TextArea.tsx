import './TextArea.css'

type Props = {
  id?: string
  name?: string
  cols?: number
  rows?: number
  value?: string
  onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export function TextArea({
  id,
  name,
  cols = 30,
  rows = 10,
  value,
  onTextAreaChange = (f) => f,
}: Props) {
  return (
    <textarea
      id={id}
      name={name}
      cols={cols}
      rows={rows}
      value={value}
      onChange={onTextAreaChange}
    ></textarea>
  )
}
