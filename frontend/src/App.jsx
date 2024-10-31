import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/Profile/UserProfile'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AboutUs from './pages/About/AboutUs'

const App = () => {
  const[showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
       <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route 
              path='/myorders' 
              element={
                  <ProtectedRoute> 
                     <MyOrders/>              
                  </ProtectedRoute>
                 } />
          <Route 
              path='/myprofile'
              element={
                 <ProtectedRoute> 
                      <UserProfile/>
                 </ProtectedRoute>
            } />

        </Routes>
    </div>
    <Footer/>
          <ToastContainer />

    </>
  )
}

export default App
