import React, { useState, useReducer } from 'react';
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
    BOTTOM: 'bottom',
    ZOOM: 'zoom'
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

//TESTING
const initialState = {
    cameraCoord: [0,0,350, 0,0,0, 0,1,0],
    view: getViewCoord(viewStates.DYNAMIC, viewStates),
    zoom: 300,
    deckBottom: 'deck_bottom_001',
    deckTop: 'deck_top_001',
    deckMiddle: 'deck_middle_001',
    trucks: 'trucks_001',
    wheels: 'wheels_001'
}

const cameraReducer = (state, action) => {
    switch (action.viewState) {
        case viewStates.RESET:
            return { ...state, cameraCoord: [0,0,350, 0,0,0, 0,1,0] }
        case viewStates.ZOOM:
            return {...state, zoom: action.zoomValue}
        default:
            return { ...state, view: getViewCoord(action.viewState, viewStates) }
    }
}

const galleryReducer = (state, action) => {
    const category = action.assetID.slice(0, action.assetID.length - 4);
    switch(category) {
        case 'deck_bottom':
            return {...state, deckBottom: action.assetID}
        case 'deck_top':
            return {...state, deckTop: action.assetID}
        case 'deck_middle':
            return {...state, deckMiddle: action.assetID}
        case 'trucks':
            return {...state, trucks: action.assetID}
        case 'wheels':
            return {...state, deckBottom: action.assetID}
        default:
            console.log('No Category Selected');
    }
}

const SkateBuilder = () => {

    //const [zoom, setZoom] = useState(300);
    // const [deckBottom, setDeckBottom] = useState('deck_bottom_001');
    // const [deckTop, setDeckTop] = useState('deck_top_001');
    // const [deckMiddle, setDeckMiddle] = useState('deck_middle_001');
    // const [trucks, setTrucks] = useState('trucks_001');
    // const [wheels, setWheels] = useState('wheels_001');

    // const galleryHandler = (event) => {
    //     const id = event.target.closest('button').id;
    //     //const type = event.target.closest('button').id.slice(0, id.length - 4);

    //     return id;

    //     // switch(btnCategory) {
    //     //     case 'deck_bottom':
    //     //         setDeckBottom(btnID);
    //     //         break;
    //     //     case 'deck_top':
    //     //         setDeckTop(btnID);
    //     //         break;
    //     //     case 'deck_middle':
    //     //         setDeckMiddle(btnID);
    //     //         break;
    //     //     case 'trucks':
    //     //         setTrucks(btnID);
    //     //         break;
    //     //     case 'wheels':
    //     //         setWheels(btnID);
    //     //         break;
    //     //     default:
    //     //         console.log('No Category Matched');
    //     // }
    // }

    const [cameraState, cameraDispatch] = useReducer(cameraReducer, initialState);
    const [galleryState, galleryDispatch] = useReducer(galleryReducer, initialState);

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
            cameraCoord={cameraState.cameraCoord}
            view={cameraState.view}
            zoom={cameraState.zoom}
            deckTop={galleryState.deckTop}
            deckMiddle={galleryState.deckMiddle}
            deckBottom={galleryState.deckBottom}
            trucks={galleryState.trucks}
            wheels={galleryState.wheels}
            />

            <CameraController
            style={classes.cameraController}
            click={(event) => cameraDispatch({ viewState: event.target.id.replace('Btn', '') })}
            />

            <ZoomController 
            slider={(event) => cameraDispatch({ viewState: viewStates.ZOOM, zoomValue: event.target.value })}
            default={cameraState.zoom}
            min={zoomProperties.MIN}
            max={zoomProperties.MAX}
            />

            {/* Right Hand Side */}
            <div className={classes.galleryControllers}>
                <GalleryController 
                type={'deck_bottom'} 
                instances={generateGalleryInstanceArr(galleryCount['deck_bottom'])}
                click={(event)=> galleryDispatch({assetID: event.target.closest('button').id})}
                />
                <GalleryController 
                type={'deck_top'} 
                instances={generateGalleryInstanceArr(galleryCount['deck_top'])}
                click={(event)=> galleryDispatch({assetID: event.target.closest('button').id})}
                />
                <GalleryController 
                type={'trucks'} 
                instances={generateGalleryInstanceArr(galleryCount['trucks'])}
                click={(event)=> galleryDispatch({assetID: event.target.closest('button').id})}
                />
                <GalleryController 
                type={'wheels'} 
                instances={generateGalleryInstanceArr(galleryCount['wheels'])}
                click={(event)=> galleryDispatch({assetID: event.target.closest('button').id})}
                />
            </div>
        </div>
    );
};

export default SkateBuilder;