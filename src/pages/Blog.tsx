import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../hooks'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { PostList } from '../components/PostList'
import { CreatePost } from '../components/CreatePost'
import { Icon } from '../components/Icon'
import { Header } from '../components/Header'
import { Link } from 'react-router-dom'
import './Blog.css'

type DecodedToken = {
  sub?: string
}

function Blog() {
  const { token } = useAuth()
  let sub: string | null = null
  if (token) {
    const decoded = jwtDecode<DecodedToken>(token)
    sub = decoded.sub ?? null
  }
  return (
    <>
      <Header />

      {sub ? (
        <>
          <div className='ticks'></div>
          <section>
            <CreatePost />
          </section>
        </>
      ) : (
        <>
          <div className='ticks'></div>
          <div className='notice'>
            Please <Link to='/login'>log in</Link> or{' '}
            <Link to='/signup'>sign up</Link> to create new posts.
          </div>
        </>
      )}

      <div className='ticks'></div>

      <PostList />

      <div className='ticks'></div>

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
}

export default Blog
