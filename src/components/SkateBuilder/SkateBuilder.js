import React, { useState, useEffect } from 'react';
import classes from './SkateBuilder.module.css';

import Sketch from '../Sketch/sketch';
import P5Wrapper from 'react-p5-wrapper';
import CameraController from './../CameraController/CameraController';
/**
 * TODO:
 * 1. Add cameracontroller.
 * 2. Add cameracontroller click handler.
 */

const SkateBuilder = () => {

    const viewStates = {
        RESET: "reset",
        DYNAMIC: "dynamic",
        FRONT: 'front',
        SIDE: 'side',
        TOP: 'top',
        BOTTOM: 'bottom'
    }

    const getViewCoord = (viewState, viewStates) => {

        const coordinates = {
            dynamic: {x:-60, y:-10, z:15},
            front: {x:-90,y:0,z:0},
            side: {x:-90,y:0,z:90},
            top: {x:0,y:180,z:0},
            bottom: {x:0,y:0,z:0}
        };
        
        let viewCoord;
        switch(viewState) {
            case viewStates.DYNAMIC:
                viewCoord = {...coordinates.dynamic};
                break;
            case viewStates.FRONT:
                viewCoord = {...coordinates.front};
                break;
            case viewStates.SIDE:
                viewCoord = {...coordinates.side};
                break;
            case viewStates.TOP:
                viewCoord = {...coordinates.top};
                break;
            case viewStates.BOTTOM:
                viewCoord = {...coordinates.bottom};
                break;
            default:
                viewCoord = {...coordinates.dynamic};
        }
        return viewCoord
    }

    //State variables
    const [cameraCoord, setCameraCoord] = useState([0, 0, 350, 0, 0, 0, 0, 1, 0]);
    const [btnCaller, setBtnCaller] = useState(null);
    const [skateTexture, setSkateTexture] = useState(require('./../../assets/Skateboard/uv-map.jpg'));
    const [zoom, setZoom] = useState(400);
    const [view, setView] = useState(getViewCoord(viewStates.FRONT, viewStates));

    const cameraHandler = (event) => {
        const viewState = event.target.id.replace('Btn', '');
        if(viewState === viewStates.RESET) {
            setCameraCoord([0,0,350, 0,0,0, 0,1,0]);
        } else {
            setView(getViewCoord(viewState, viewStates));
        }
    }

    const handleSlide = (event) => {
        setZoom(event.target.value);
    }

    return (
        <div className={classes.SkateBuilder}>
            <P5Wrapper
                sketch={Sketch}
                skateTexture={require('./../../assets/Skateboard/textura.png')}
                cameraCoord={cameraCoord}
                view={view}
                zoom={zoom}
            />
            <CameraController 
            click={cameraHandler}
            slider={handleSlide}
            />
        </div>
    );
};

export default SkateBuilder;

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