import { Post } from './Post'
import { PostFilter } from './PostFilter'
import { PostSorting } from './PostSorting'
import { usePosts } from '../hooks'
import './PostList.css'

export function PostList() {
  const { posts } = usePosts()

  return (
    <section className='post-list'>
      <div className='head'>
        <h1 className='heading'>Blog Posts</h1>
        <span className='count'>{posts.length}</span>
        <button className='clear-all'>Clear All</button>
      </div>
      <section className='post-sorting-options'>
        <PostFilter
          field='author'
          placeholder='Enter an authors full name to sort'
        />
        <PostSorting
          sortByFields={['createdAt', 'updatedAt']}
          sortOrderFields={['ascending', 'descending']}
        />
      </section>

      {!!posts.length && (
        <section className='post-list-summary'>
          <ul className='cards'>
            {posts.map((post, i) => (
              <Post {...post} key={i} />
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
