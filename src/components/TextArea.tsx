import './TextArea.css'

type Props = {
  id?: string
  name?: string
  cols?: number
  rows?: number
}
export function TextArea({ id, name, cols = 30, rows = 10 }: Props) {
  return <textarea id={id} name={name} cols={cols} rows={rows}></textarea>
}
