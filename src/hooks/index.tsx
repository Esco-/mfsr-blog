import { useState } from 'react'

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  return [
    {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialValue),
  ]
}

export const useInputWidget = (
  initialValue: string,
): [
  {
    value: string
    onTextInputWidgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  },
  () => void,
] => {
  const [value, setValue] = useState<string>(initialValue)
  return [
    {
      value,
      onTextInputWidgetChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialValue),
  ]
}

export const useTextAreaWidget = (
  initialValue: string,
): [
  {
    value: string
    onTextAreaWidgetChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  },
  () => void,
] => {
  const [value, setValue] = useState<string>(initialValue)
  return [
    {
      value,
      onTextAreaWidgetChange: (e) => setValue(e.target.value),
    },
    () => setValue(initialValue),
  ]
}
