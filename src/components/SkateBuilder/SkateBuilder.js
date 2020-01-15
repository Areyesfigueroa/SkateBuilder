import React, { useState } from 'react';

import Sketch from '../Sketch/sketch';
import P5Wrapper from 'react-p5-wrapper';

const SkateBuilder = () => {
    //TEMP, Controller component will handle this. 
    // const buttonIDs = {
    //     resetCameraBtn: 'resetViewBtn',
    //     skateTextureBtn: 'changeDeckTextureBtn',
    //     zoomSlider: "zoomSlider",
    //     viewPanels: "viewPanelsBtn"
    // }

    // const skatePositions = {
    //     DYNAMIC: "dynamic",
    //     FRONT: 'front',
    //     SIDE: 'side',
    //     TOP: 'top',
    //     BOTTOM: 'bottom'
    // }

    // //Camera Zoom Properties, TEMP
    // const zoomProps = {
    //     min: 150, //150
    //     max: 600, //600
    //     default: 0 //600
    // }

    // //State variables
    // const [cameraCoord, setCameraCoord] = useState([0, 0, 350, 0, 0, 0, 0, 1, 0]);
    // const [btnCaller, setBtnCaller] = useState(null);
    // const [skateTexture, setSkateTexture] = useState(require('./../../assets/Skateboard/uv-map.jpg'));
    // const [zoom, setZoom] = useState(450);
    // const [skatePosition, setSkatePosition] = useState(skatePositions.FRONT);

    // const resetCameraHandler = (event, coord = [0, 0, 350, 0, 0, 0, 0, 1, 0]) => {
    //     setBtnCaller(event.target.id);
    //     setCameraCoord(coord);
    // }
    // const skateTextureHandler = (event, texture) => {
    //     setBtnCaller(event.target.id);
    //     setSkateTexture(texture);
    // }
    // const zoomSliderHandler = (event) => {
    //     setBtnCaller(event.target.id);
    //     setZoom(event.target.value);
    // }
    // const changeSkatePos = (position) => {
    //     setBtnCaller(buttonIDs.viewPanels);
    //     setSkatePosition(position);
    // }

    return (
        <div>
            <P5Wrapper
                sketch={Sketch}
                skateTexture={require('./../../assets/Skateboard/textura.png')}
            />
        </div>
    );
};

export default SkateBuilder;