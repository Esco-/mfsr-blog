import './Tag.css'
export type Props = {
  title: string
}

export function Tag({ title }: Props) {
  return (
    <li className='tag'>
      <a href='http://localhost:5173#' title={title}>
        {title}
      </a>
    </li>
  )
}
