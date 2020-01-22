import React from 'react';
import classes from './GalleryController.module.css';

import GalleryItems from './GalleryItems/GalleryItems';

const GalleryController = (props) => {
    return (
        <div className={classes.GalleryController}>
            <GalleryItems type={props.type} instances={props.instances}/>
        </div>
    );
};

export default GalleryController;