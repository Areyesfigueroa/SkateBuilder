import React, { useState, useEffect } from 'react';
import classes from './SkateBuilder.module.css';

import Sketch from '../Sketch/sketch';
import P5Wrapper from 'react-p5-wrapper';

//Controllers
import CameraController from './../CameraController/CameraController';
import ZoomController from './../ZoomController/ZoomController';
import ButtonController from './../ButtonController/ButtonController';
import GalleryController from './../GalleryController/GalleryController';
/**
 * TODO:
 * 1. Add cameracontroller.
 * 2. Add cameracontroller click handler.
 */

const viewStates = {
    RESET: "reset",
    DYNAMIC: "dynamic",
    FRONT: 'front',
    SIDE: 'side',
    TOP: 'top',
    BOTTOM: 'bottom'
}

const zoomProperties = {
    MIN: 150,
    MAX: 800
}

const getViewCoord = (viewState, viewStates) => {

    const coordinates = {
        dynamic: {x:130, y:0, z:160},
        front: {x:90,y:0,z:0},
        side: {x:90,y:0,z:-90},
        top: {x:0,y:0,z:0},
        bottom: {x:0,y:-180,z:0}
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

const SkateBuilder = () => {

    const [cameraCoord, setCameraCoord] = useState([0, 0, 350, 0, 0, 0, 0, 1, 0]);
    const [zoom, setZoom] = useState(300);
    const [view, setView] = useState(getViewCoord(viewStates.DYNAMIC, viewStates));

    const cameraHandler = (event) => {
        const viewState = event.target.id.replace('Btn', '');
        if(viewState === viewStates.RESET) {
            setCameraCoord([0,0,350, 0,0,0, 0,1,0]);
        } else {
            setView(getViewCoord(viewState, viewStates));
        }
    }

    return (
        <div className={classes.SkateBuilder}>
            
            <div className={classes.buttonControllers}>
                <ButtonController 
                btn1Name='Save to MyBoards' 
                btn2Name='Add to cart'
                />
                <ButtonController 
                btn1Name='3D' 
                btn2Name='2D'
                />
            </div>

            {/* Left Hand Side */}
            <P5Wrapper
            sketch={Sketch}
            skateTexture={require('./../../assets/Skateboard/textura.png')}
            cameraCoord={cameraCoord}
            view={view}
            zoom={zoom}
            />

            <CameraController
            style={classes.cameraController}
            click={cameraHandler}
            />

            <ZoomController 
            slider={(event) => setZoom(event.target.value)}
            default={zoom}
            min={zoomProperties.MIN}
            max={zoomProperties.MAX}
            />

            {/* Right Hand Side */}
            <div className={classes.galleryControllers}>
                <GalleryController type={'deck_bottom'} instances={['001', '002']}/>
                <GalleryController type={'deck_top'} instances={['001', '002']}/>
                <GalleryController type={'trucks'} instances={['001', '002']}/>
                <GalleryController type={'wheels'} instances={['001', '002']}/>
            </div>
        </div>
    );
};

export default SkateBuilder;