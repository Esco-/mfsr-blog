import { Input } from './Input'
import './InputButton.css'

type Props = {
  value: string
  className?: string
  disabled?: boolean
  type?: string
}

export function InputButton({ value = 'Submit', disabled = false }: Props) {
  return (
    <Input type='submit' value={value} className='submit' disabled={disabled} />
  )
}
