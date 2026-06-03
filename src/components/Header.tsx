import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import { Navbar } from './Navbar'
import './Header.css'

export const Header = () => {
  return (
    <>
      <span className='bands'></span>
      <Navbar />

      <div className='ticks'></div>

      <section className='center'>
        <div className='hero'>
          <img
            src={heroImg}
            className='base'
            width='170'
            height='179'
            alt='base'
          />
          <img src={viteLogo} className='vite' alt='Vite logo' />
          <img src={reactLogo} className='framework react' alt='React logo' />
        </div>
        <h1>Node.js Blog: Get started</h1>
      </section>
    </>
  )
}
