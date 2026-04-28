import { Select } from './Select'
import './SelectFieldsWidget.css'

type Props = {
  name?: string
  label?: string
  fields: string[]
  value?: string
  onSelectWidgetChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function SelectFieldsWidget({
  name = 'text-input-widget',
  label = 'Label',
  fields = [],
  value,
  onSelectWidgetChange,
}: Props) {
  return (
    <div className='select-fields-widget'>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        fields={fields}
        value={value}
        onSelectChange={onSelectWidgetChange}
      />
      <svg
        className='dropdown-icon'
        role='option'
        fill='currentColor'
        aria-hidden='true'
      >
        <use href='/icons.svg#dropdown-icon'></use>
      </svg>
    </div>
  )
}
