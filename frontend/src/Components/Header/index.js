import React from 'react';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Imports
import { Container, Row, Col } from 'react-bootstrap'

// Media Imports
import Logo from './../../Assets/PC-logo1.png'

const Header = props => {
    return(
        <header className="header">
            <div className="wrap">
                <div >
                    <img className="logo1" src={Logo} alt="Penelope's Collectionz"></img>
                </div>
            </div>
        </header>
    );
}

export default Header;