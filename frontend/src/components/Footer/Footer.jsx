import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
     <div className="footer-content">
        <div className="footer-content-left">
            {/* <img src={assets.logo} alt="" /> */}
            <h2 style={{color:'tomato'}}>Food del</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita et debitis facilis voluptas consequuntur blanditiis obcaecati natus cumque doloremque tempore.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
               <li>Home</li>
               <li>About us</li>
               <li>Delivery</li>
               <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+919080706050</li>
                <li>contact@master.com</li>
            </ul>
        </div>
     </div>
      <hr />
      <p className="footer-copyright">Copyright 2024  © Fast Food Delivery.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
