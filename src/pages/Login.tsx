import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { login } from '../api/users.js'
import type { LoginResponse } from '../api/users.js'
import { TextInputWidget } from '../components/TextInputWidget'
import { InputButton } from '../components/InputButton'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import './Login.css'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useAuth()
  const navigate = useNavigate()
  const loginMutation = useMutation<LoginResponse, Error, void>({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('failed to login!'),
  })
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <>
      <Header />
      <div className='ticks'></div>
      <section className='sign-up create-post'>
        <div className='head'>
          <h2>Log in</h2>
        </div>
        <form onSubmit={handleSubmit} action=''>
          <TextInputWidget
            name='create-username'
            label='Username *'
            value={username}
            onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <TextInputWidget
            type='password'
            name='create-password'
            label='Password *'
            value={password}
            onTextInputWidgetChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <InputButton
            value={loginMutation.isPending ? 'Logging in...' : 'Log in'}
            disabled={!username || !password || loginMutation.isPending}
          />
        </form>
      </section>
      <div className='ticks'></div>
      <Footer />
    </>
  )
}
