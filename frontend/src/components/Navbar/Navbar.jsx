import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/ContextStore';
import image from './image.png';

const Navbar = ({ setShowLogin }) => {
    const { pathname } = useLocation();
    const [menu, setMenu] = useState(pathname); // Initialize with current path
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={image} alt="" className='logo' />
            </Link>

            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <Link to='/about' onClick={() => setMenu("about")} className={menu === 'about' ? 'active' : ''}>About</Link>
            </ul>


            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Cart" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myprofile')}>
                                <img src={assets.profile_icon} alt="" />
                                <p>Profile</p>
                            </li>
                            <hr />
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
