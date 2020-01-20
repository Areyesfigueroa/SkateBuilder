import React from 'react';
import classes from './ZoomController.module.css';

const ZoomController = (props) => {
    const zoomProps = {
        default: props.defaultZoom ? props.defaultZoom : 400,
        min: props.minZoom ? props.minZoom : 150,
        max: props.maxZoom ? props.maxZoom : 800,
    }
    return (
        <div className={classes.ZoomController}>
            <span>Zoom In</span>
            <input id={'zoomSlider'} 
            type="range" 
            min={zoomProps.min} 
            max={zoomProps.max} 
            defaultValue={zoomProps.default} 
            onChange={props.slider} />
            <span>Zoom Out</span>
        </div>
    );
};

export default ZoomController;