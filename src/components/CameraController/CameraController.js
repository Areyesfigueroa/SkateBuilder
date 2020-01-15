import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const CameraController = (props) => {
    const btnIDs = {
        dynamicBtn: 'dynamicBtn',
        topBtn: 'topBtn',
        bottomBtn: 'bottomBtn',
        frontBtn: 'frontBtn',
        sideBtn: 'sideBtn',
        zoomSlider: 'zoomSlider'
    };

    const zoomProps = {
        default: props.defaultZoom ? props.defaultZoom : 300,
        min: props.minZoom ? props.minZoom : 150,
        max: props.maxZoom ? props.maxZoom : 300,
        zoomHandler: props.zoomHandler
    }

    return (
        <ButtonGroup>
            <Button id={btnIDs.dynamicBtn}>Dynamic</Button>
            <Button id={btnIDs.topBtn}>Top</Button>
            <Button id={btnIDs.bottomBtn}>Bottom</Button>
            <Button id={btnIDs.frontBtn}>Front</Button>
            <Button id={btnIDs.sideBtn}>Side</Button>
            <input id={btnIDs.zoomSlider} 
            type="range" 
            min={zoomProps.min} 
            max={zoomProps.max} 
            default={zoomProps.default} 
            onChange={props.zoomHandler} />
        </ButtonGroup>
    );
};

export default CameraController;