import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users'

type UserProps = {
  id: string
}

type UserInfo = {
  username: string
}

export const User = ({ id }: UserProps) => {
  const userInfoQuery = useQuery<UserInfo>({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })

  return <strong>{userInfoQuery.data?.username ?? id}</strong>
}
