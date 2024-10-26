import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import logo from './image.png'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt="" />
      <p>Admin Panel</p>
      <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar
