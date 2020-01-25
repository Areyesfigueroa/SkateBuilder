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
 * 1. Change the board to the selected texture. 
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

const galleryCount = {
    'deck_bottom': 3,
    'deck_top': 2,
    'deck_middle': 2,
    'trucks': 4,
    'wheels': 2
}


const generateGalleryInstanceArr = (instanceCount) => {
    let instanceArr = [];
    for(let i=1; i <= instanceCount; i++) {
        if(i < 10) {
            instanceArr.push(`00${i}`);
        } else if (i >= 10 && i < 100) {
            instanceArr.push(`0${i}`);
        } else if(i >= 100) {
            instanceArr.push(`${i}`);
        }
    }
    return instanceArr;
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
    const [deckBottom, setDeckBottom] = useState('deck_bottom_001');
    const [deckTop, setDeckTop] = useState('deck_top_001');
    const [deckMiddle, setDeckMiddle] = useState('deck_middle_001');
    const [trucks, setTrucks] = useState('trucks_001');
    const [wheels, setWheels] = useState('wheels_001');

    const galleryHandler = (event) => {
        const btnID = event.target.closest('button').id;
        const btnCategory = event.target.closest('button').id.slice(0, btnID.length - 4);

        switch(btnCategory) {
            case 'deck_bottom':
                setDeckBottom(btnID);
                break;
            case 'deck_top':
                setDeckTop(btnID);
                break;
            case 'deck_middle':
                setDeckMiddle(btnID);
                break;
            case 'trucks':
                setTrucks(btnID);
                break;
            case 'wheels':
                setWheels(btnID);
                break;
            default:
                console.log('No Category Matched');
        }
    }

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
            deckTop={deckTop}
            deckMiddle={deckMiddle}
            deckBottom={deckBottom}
            trucks={trucks}
            wheels={wheels}
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
                <GalleryController 
                type={'deck_bottom'} 
                instances={generateGalleryInstanceArr(galleryCount['deck_bottom'])}
                click={galleryHandler}
                />
                <GalleryController 
                type={'deck_top'} 
                instances={generateGalleryInstanceArr(galleryCount['deck_top'])}
                click={galleryHandler}
                />
                <GalleryController 
                type={'trucks'} 
                instances={generateGalleryInstanceArr(galleryCount['trucks'])}
                click={galleryHandler}
                />
                <GalleryController 
                type={'wheels'} 
                instances={generateGalleryInstanceArr(galleryCount['wheels'])}
                click={galleryHandler}
                />
            </div>
        </div>
    );
};

export default SkateBuilder;