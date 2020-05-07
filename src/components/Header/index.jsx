import React from 'react';

import CountdownLogo from "../../assets/images/countdown-logo.png"

const Header = () => {
    return (
        <div className="Header">
            <img src={CountdownLogo} alt="Countdown Logo"/>
        </div>
    )
}

export default Header;
