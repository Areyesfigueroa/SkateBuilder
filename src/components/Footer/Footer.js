import React from 'react';

//Custom style
import classes from './Footer.module.css';

const Footer = () => {
    return (
        <div className={classes.Footer}>
            <ul>
                <li>Copyright @2020</li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    );
};

export default Footer;