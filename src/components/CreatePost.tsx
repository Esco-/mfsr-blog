import { TextAreaWidget } from './TextAreaWidget'
import { TextInputWidget } from './TextInputWidget'
import { InputButton } from './InputButton.jsx'
import './CreatePost.css'

export function CreatePost() {
  return (
    <section className='create-post'>
      <form onSubmit={(e) => e.preventDefault()} action='' className='stack'>
        <TextInputWidget name='create-title' label='Post title' />
        <TextInputWidget name='create-author' label='Post author' />
        <TextAreaWidget name='post' label='Post text' />
        <InputButton value='Create' type='submit' />
      </form>
    </section>
  )
}
