import './Input.css'

export type Props = {
  type: string
  value?: string | string[]
  id?: string
  className?: string
  name?: string
  autoComplete?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
}

export function Input({
  type,
  value,
  id,
  className,
  name,
  onChange = (f) => f,
  disabled,
  placeholder,
  autoComplete,
}: Props) {
  return (
    <input
      type={type}
      id={id}
      className={className}
      name={name}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  )
}
