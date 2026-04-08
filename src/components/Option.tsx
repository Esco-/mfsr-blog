type Props = {
  field: string
  key?: string
}
export function Option({ field }: Props) {
  return <option value={field}>{field}</option>
}
