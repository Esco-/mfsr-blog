export type Props = {
  type: string
  value?: string
  id?: string
  className?: string
  name?: string
  autocomplete?: string
}

export function Input({
  type,
  value,
  id,
  className,
  name,
  autocomplete = 'off',
}: Props) {
  return (
    <input
      type={type}
      value={value}
      id={id}
      className={className}
      name={name}
      autoComplete={autocomplete}
    />
  )
}
