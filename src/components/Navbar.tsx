import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom'
import './Navbar.css'

type DecodedToken = {
  sub?: string
}

export const Navbar = () => {
  const [token, setToken] = useAuth()
  let sub: string | null = null
  if (token) {
    const decoded = jwtDecode<DecodedToken>(token)
    sub = decoded.sub ?? null
  }
  return (
    <nav id='main-menu'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {sub ? (
          <>
            <li>
              <Link to='/' onClick={() => setToken(null)}>
                Logout
              </Link>
            </li>
            <li>
              Logged in as <strong>{sub}</strong>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Log in</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
