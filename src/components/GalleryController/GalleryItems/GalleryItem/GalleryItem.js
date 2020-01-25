import React from 'react';
import classes from './GalleryItem.module.css';

import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const GalleryItem = (props) => {
    return (
        <div className={classes.GalleryItem}>
            <Button id={props.imageName} variant="outline-secondary" onClick={props.click}>
                <Image src={require(`./../../../../assets/SkateboardTextures/${props.imageName}.jpg`)} fluid thumbnail/>
            </Button>
        </div>
    );
};

export default GalleryItem;