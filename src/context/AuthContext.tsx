import { useState } from 'react'
import { AuthContext } from '../hooks'

type AuthContextProviderProps = {
  children: React.ReactElement
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const logout = () => setToken(null)

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
