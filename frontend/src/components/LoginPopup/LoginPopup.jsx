import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/ContextStore';
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

 const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;

    try {
        const response = await axios.post(newUrl, data);
        // console.log("API response:", response.data); // Log response for debugging

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);

            // Show success toast
            toast.success(currState === "Login" ? "Successfully logged in!" : "Account created successfully!", {
                position: "top-right",
                autoClose: 3000, // Auto-close after 3 seconds
            });
            setShowLogin(false);

        } else {
            toast.error(response.data.message, { 
              position: "top-right" ,
              autoClose: 3000, // Auto-close after 3 seconds
            });
        }
    } catch (error) {
        console.error("Error during API call:", error); // Log any errors
        toast.error("An error occurred. Please try again.", { 
          position: "top-right" ,
          autoClose: 3000, // Auto-close after 3 seconds
        });
    } finally {
        setLoading(false); // Stop loading
    }
};


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className='login-popup-inputs'>
          {currState === "Login" ? null : (
            <input 
              name='name' 
              onChange={onChangeHandler} 
              value={data.name} 
              type="text" 
              placeholder='Your Name' 
              required 
            />
          )}
          <input 
            name='email' 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder='Your Email' 
            required 
          />
          <input 
            name='password' 
            onChange={onChangeHandler} 
            value={data.password} 
            type="password" 
            placeholder='Password' 
            required 
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : (currState === "Sign Up" ? "Create Account" : "Login")}
        </button>
        
        {/* {currState === "Sign Up" && ( // Show agreement only for Sign Up
          <div className="login-popup-condition">
            <label>
              <input type="checkbox" required />
              By continuing, I agree to the 
              <Link to="/terms" className="link"> Terms of Service</Link> and 
              <Link to="/privacy" className="link"> Privacy Policy</Link>.
            </label>
          </div>
        )} */}
        
        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default LoginPopup;
