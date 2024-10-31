import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-container">
            <div className="about-card">
                <h1>About Us</h1>
                <p>Welcome to <span className="brand-name">Food del</span> – your go-to destination for fresh, delicious meals delivered straight to your door. Our mission is simple: to connect you with high-quality food from your favorite local restaurants, while making ordering easy and convenient.</p>
                <p>We’re committed to fast delivery, exceptional service, and a seamless experience from start to finish. Whether you’re craving comfort food or exploring new flavors, we’re here to make it happen.</p>
                <p>Thank you for choosing us to satisfy your cravings.</p>
            </div>
        </div>
    );
};

export default AboutUs;
