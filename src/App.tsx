import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PostProvider } from './context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blog from './pages/Blog'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
