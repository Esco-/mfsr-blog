type UserPayload = {
  username: string
  password: string
}

type User = UserPayload & {
  _id: string
  createdAt: string
  updatedAt: string
}

export type SignupResponse = User

export type LoginResponse = {
  token: string
}

type UserInfoResponse = {
  username: string
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL as string
if (!BASE_URL) throw new Error('Missing VITE_BACKEND_URL')

const parseJson = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API error ${res.status}: ${body}`)
  }
  return res.json() as Promise<T>
}

export const signup = async ({
  username,
  password,
}: UserPayload): Promise<SignupResponse> => {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('failed to sign up')
  return await res.json()
}

export const login = async ({
  username,
  password,
}: UserPayload): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return await parseJson<LoginResponse>(res)
}

export const getUserInfo = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await parseJson<UserInfoResponse>(res)
}
