import { TextArea } from './TextArea'
import './TextAreaWidget.css'

type Props = {
  name?: string
  label?: string
}

export function TextAreaWidget({
  name = 'text-area-widget',
  label = 'Label',
}: Props) {
  return (
    <div className='text-area'>
      <label htmlFor={name}>{label}</label>
      <TextArea id={name} name={name} />
      <p>Write a few sentences for the post.</p>
    </div>
  )
}
