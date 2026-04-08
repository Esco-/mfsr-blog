import { Post, type Props as PostProps } from './Post'
import './PostList.css'

type Props = {
  posts: PostProps[]
}

export function PostList({ posts = [] }: Props) {
  return (
    !!posts.length && (
      <section className='post-list-summary'>
        <div className='head'>
          <span className='heading'>Blog Posts</span>
          <span className='count'>{posts.length}</span>
          <button className='clear-all'>Clear All</button>
        </div>
        <ul className='cards'>
          {posts.map((post, i) => (
            <Post {...post} key={i} />
          ))}
        </ul>
      </section>
    )
  )
}
