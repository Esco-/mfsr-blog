import './Icon.css'
type IconProps = {
  iconId: string
  className?: string
}

export const Icon = ({ iconId, className = 'icon' }: IconProps) => (
  <svg className={className} role='presentation' aria-hidden='true'>
    <use href={`/icons.svg#${iconId}`}></use>
  </svg>
)
