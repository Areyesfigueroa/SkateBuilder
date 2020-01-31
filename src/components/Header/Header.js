import React from 'react';

//Custom style
import classes from './Header.module.css';

//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

//Container
function Header() {

    const logo = require('./../../assets/Logos/site-logo.png');

    return (
        <Navbar bg="light" expand="lg" className={classes.Header}>
            <Navbar.Brand href="#home">
                <Image src={logo} alt={'Logo'} className={classes.logo} fluid={true}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{width: '100%'}}>
                    <Nav.Item>
                        <Nav.Link href="#myboards">MyBoards</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#cart">Cart</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;