import './Tag.css'
export type Props = {
  title: string
}

export function Tag({ title }: Props) {
  return (
    <li className='tag'>
      <a href='#' title={title}>
        {title}
      </a>
    </li>
  )
}
