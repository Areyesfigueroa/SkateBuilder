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
        default: props.defaultZoom ? props.defaultZoom : 400,
        min: props.minZoom ? props.minZoom : 200,
        max: props.maxZoom ? props.maxZoom : 600,
    }

    return (
        <div>
            <ButtonGroup>
                <Button id={btnIDs.dynamicBtn} onClick={props.click}>Dynamic</Button>
                <Button id={btnIDs.topBtn} onClick={props.click}>Top</Button>
                <Button id={btnIDs.bottomBtn} onClick={props.click}>Bottom</Button>
                <Button id={btnIDs.frontBtn} onClick={props.click}>Front</Button>
                <Button id={btnIDs.sideBtn} onClick={props.click}>Side</Button>
            </ButtonGroup>
            <div>
                <input id={btnIDs.zoomSlider} 
                type="range" 
                min={zoomProps.min} 
                max={zoomProps.max} 
                defaultValue={zoomProps.default} 
                onChange={props.slider} />
            </div>
        </div>
    );
};

export default CameraController;