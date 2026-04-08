import { type Props as InputProps } from './Input'
import { Input } from './Input'
import './InputButton.css'

export function InputButton({ value = 'Submit' }: InputProps) {
  return <Input type='submit' value={value} className='submit' />
}
