import { Icon } from './Icon'
import viteLogo from '../assets/vite.svg'
import reactLogo from '../assets/react.svg'

export const Footer = () => (
  <>
    <section id='next-steps'>
      <div id='docs'>
        <Icon iconId='documentation-icon' />
        <h2>Documentation</h2>
        <p>Your questions, answered</p>
        <ul>
          <li>
            <a href='https://vite.dev/' target='_blank' rel='noreferrer'>
              <img className='logo' src={viteLogo} alt='' />
              Learn more
            </a>
          </li>
          <li>
            <a href='https://react.dev' target='_blank' rel='noreferrer'>
              <img className='button-icon' src={reactLogo} alt='' />
              Learn more
            </a>
          </li>
        </ul>
      </div>
      <div id='social'>
        <Icon iconId='social-icon' />
        <h2>Connect with us</h2>
        <p>Join the Vite community</p>
        <ul>
          <li>
            <a
              href='https://github.com/vitejs/vite'
              target='_blank'
              rel='noreferrer'
            >
              <Icon iconId='github-icon' className='button-icon' />
              GitHub
            </a>
          </li>
          <li>
            <a href='https://chat.vite.dev/' target='_blank' rel='noreferrer'>
              <Icon iconId='discord-icon' className='button-icon' />
              Discord
            </a>
          </li>
          <li>
            <a href='https://x.com/vite_js' target='_blank' rel='noreferrer'>
              <Icon iconId='x-icon' className='button-icon' />
              X.com
            </a>
          </li>
          <li>
            <a
              href='https://bsky.app/profile/vite.dev'
              target='_blank'
              rel='noreferrer'
            >
              <Icon iconId='bluesky-icon' className='button-icon' />
              Bluesky
            </a>
          </li>
        </ul>
      </div>
    </section>

    <div className='ticks'></div>
    <section id='spacer'></section>
  </>
)
