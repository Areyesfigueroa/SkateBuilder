import React from 'react';
import classes from './GalleryItem.module.css';

import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const GalleryItem = (props) => {
    return (
        <div className={classes.GalleryItem}>
            <Button variant="outline-secondary">
                <Image src={require(`./../../../../assets/SkateboardTextures/${props.imageName}.jpg`)} fluid thumbnail/>
            </Button>
        </div>
    );
};

export default GalleryItem;