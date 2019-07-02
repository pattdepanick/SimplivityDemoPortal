import '../assets/css/header.css';
import Logo from '../assets/hpe-simplivity-380.png';
import React from 'react';

const Header = () =>
    <div>
        <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
                <a href="http://localhost:8081" className="w3-bar-item w3-button w3-padding-large">HOME</a>
                <a href="http://localhost:8081/getDatastoreInfos" className="w3-bar-item w3-button w3-padding-large w3-hide-small">Datastore</a>
                <a href="http://localhost:8081" className="w3-bar-item w3-button w3-padding-large w3-hide-small">VM</a>
            </div>
        </div>
        <div id="container">
            <img src={Logo} alt="DC" style={{ width: '100%' }} />
        </div>
    </div>;

export default Header;