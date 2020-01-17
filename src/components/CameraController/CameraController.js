import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const CameraController = (props) => {
    const btnIDs = {
        resetBtn: 'resetBtn',
        dynamicBtn: 'dynamicBtn',
        topBtn: 'topBtn',
        bottomBtn: 'bottomBtn',
        frontBtn: 'frontBtn',
        sideBtn: 'sideBtn',
        zoomSlider: 'zoomSlider'
    };

    const zoomProps = {
        default: props.defaultZoom ? props.defaultZoom : 400,
        min: props.minZoom ? props.minZoom : 150,
        max: props.maxZoom ? props.maxZoom : 800,
    }

    return (
        <div>
            <ButtonGroup>
                <Button id={btnIDs.resetBtn} onClick={props.click}>Reset</Button>
                <Button id={btnIDs.dynamicBtn} onClick={props.click}>Dynamic</Button>
                <Button id={btnIDs.topBtn} onClick={props.click}>Top</Button>
                <Button id={btnIDs.bottomBtn} onClick={props.click}>Bottom</Button>
                <Button id={btnIDs.frontBtn} onClick={props.click}>Front</Button>
                <Button id={btnIDs.sideBtn} onClick={props.click}>Side</Button>
            </ButtonGroup>
            <div>
                <span>Zoom In</span>
                <input id={btnIDs.zoomSlider} 
                type="range" 
                min={zoomProps.min} 
                max={zoomProps.max} 
                defaultValue={zoomProps.default} 
                onChange={props.slider} />
                <span>Zoom Out</span>
            </div>
        </div>
    );
};

export default CameraController;