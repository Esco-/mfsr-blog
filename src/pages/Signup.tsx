import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/users.js'
import { TextInputWidget } from '../components/TextInputWidget'
import { InputButton } from '../components/InputButton'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import './Signup.css'

export const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    signupMutation.mutate()
  }

  return (
    <>
      <Header />
      <div className='ticks'></div>
      <section className='sign-up create-post'>
        <div className='head'>
          <h2>Sign Up</h2>
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
            value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
            disabled={!username || !password || signupMutation.isPending}
          />
        </form>
      </section>
      <div className='ticks'></div>
      <Footer />
    </>
  )
}
