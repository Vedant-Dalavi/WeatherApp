import React from 'react';
import './NavBar.css'

const NavigationBar = () => {
    return (
        <div className="navbar">
            <a href="#home" className="active">Home</a>
            <a href="#last-five-days-container">forecast</a>
            <a href="#contact">Contact</a>
        </div>
    );
};

export default NavigationBar;
