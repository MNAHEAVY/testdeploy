import './LightDarkBtn.css'
import { BsMoonFill } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';
import { useEffect } from 'react';

export default function LightDarktn() {

  const handleClick = () => {
    const btnSwitch = document.getElementById('switch');
    document.body.classList.toggle('Dark');
    btnSwitch.classList.toggle('pressed');
    localStorage.getItem('lightTheme') === 'true' ? localStorage.setItem('lightTheme', 'false') : localStorage.setItem('lightTheme', 'true')
  }

  useEffect(() => {
    if (localStorage.getItem('lightTheme') !== 'true') {
      const btnSwitch = document.getElementById('switch');
      document.body.classList.toggle('Dark');
      btnSwitch.classList.toggle('pressed');
    }
  })

  return (
    <button className="switch" id="switch" onClick={handleClick}>
      <FaSun className='switchIcon' />
      <BsMoonFill className='switchIcon' />
    </button>
  )
}