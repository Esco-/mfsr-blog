import { TextArea } from './TextArea'
import './TextAreaWidget.css'

type Props = {
  name?: string
  label?: string
  value?: string
  onTextAreaWidgetChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextAreaWidget({
  name = 'text-area-widget',
  label = 'Label',
  value,
  onTextAreaWidgetChange = (f) => f,
}: Props) {
  return (
    <div className='text-area'>
      <label htmlFor={name}>{label}</label>
      <TextArea
        id={name}
        name={name}
        value={value}
        onTextAreaChange={onTextAreaWidgetChange}
      />
      <p>Write a few sentences for the post.</p>
    </div>
  )
}
