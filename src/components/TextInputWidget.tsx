import { Input } from './Input'
import './TextInputWidget.css'

type Props = {
  name?: string
  label?: string
}

export function TextInputWidget({
  name = 'text-input-widget',
  label = 'Label',
}: Props) {
  return (
    <div className='text-input'>
      <label htmlFor={name}>{label}</label>
      <Input id={name} type='text' name={name} />
    </div>
  )
}
