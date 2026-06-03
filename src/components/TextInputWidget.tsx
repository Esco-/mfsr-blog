import { Input } from './Input'
import './TextInputWidget.css'

type Props = {
  type?: string
  name?: string
  label?: string
  value?: string | string[]
  onTextInputWidgetChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  placeholder?: string
}

export function TextInputWidget({
  type = 'text',
  name = 'text-input-widget',
  label = 'Label',
  value,
  onTextInputWidgetChange = (f) => f,
  autoComplete = 'off',
  placeholder,
}: Props) {
  return (
    <div className='text-input'>
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onTextInputWidgetChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </div>
  )
}
