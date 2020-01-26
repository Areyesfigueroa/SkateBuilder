import React, {useContext} from 'react';
import GalleryItem from './GalleryItem/GalleryItem';

/**
 * Goal: Create dynamic GalleryItems within the gallery.
 * 1. Need to know what type of asset do you need?
 * 2. Need to know how many assets do you need?
 */


const GalleryItems = (props) => {
    return props.instances.map((el) => (   
        <GalleryItem 
        key={`${props.type}_${el}`}
        imageName={`${props.type}_${el}`}
        click={props.click}
        />
    ));
};

export default GalleryItems;