import React, { useReducer } from 'react';
import classes from './SkateBuilder.module.css';

//Vendors
import Sketch from '../Sketch/sketch';
import P5Wrapper from 'react-p5-wrapper';

//Controllers
import CameraController from './../CameraController/CameraController';
import ZoomController from './../ZoomController/ZoomController';
import ButtonController from './../ButtonController/ButtonController';
import GalleryController from './../GalleryController/GalleryController';

/**
 * TODO:
 * 1. Create a new prop so that it knows when to run the load image back in sketch.js.
 * 2. Create the gallery slider functionality. 
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

const galleryData = {
    deckBottom: {type: 'deck_bottom', count: 3},
    deckTop: {type: 'deck_top', count: 2},
    deckMiddle: {type: 'deck_middle', count: 2},
    trucks: {type: 'trucks', count: 4},
    wheels: {type: 'wheels', count: 2}
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

const initialState = {
    cameraCoord: [0,0,350, 0,0,0, 0,1,0],
    view: getViewCoord(viewStates.DYNAMIC, viewStates),
    zoom: 300,
    deckBottom: 'deck_bottom_001',
    deckTop: 'deck_top_001',
    deckMiddle: 'deck_middle_001',
    trucks: 'trucks_001',
    wheels: 'wheels_001',
    dimension: '3D'
}

const viewCtrlReducer = (state, action) => {
    switch (action.viewState) {
        case viewStates.RESET:
            return { ...state, cameraCoord: [0,0,350, 0,0,0, 0,1,0] }
        case viewStates.ZOOM:
            return {...state, zoom: action.zoomValue}
        default:
            return { ...state, view: getViewCoord(action.viewState, viewStates) }
    }
}

const galleryCtrlReducer = (state, action) => {
    const type = action.assetID.slice(0, action.assetID.length - 4);
    switch(type) {
        case galleryData.deckBottom.type:
            return {...state, deckBottom: action.assetID}
        case galleryData.deckTop.type:
            return {...state, deckTop: action.assetID}
        case galleryData.deckMiddle.type:
            return {...state, deckMiddle: action.assetID}
        case galleryData.trucks.type:
            return {...state, trucks: action.assetID}
        case galleryData.wheels.type:
            return {...state, deckBottom: action.assetID}
        default:
            console.log('No Category Selected');
    }
}

const buttonCtrlReducer = (state, action) => {
    switch(action.type) {
        case '2D':
            console.log(action.type);
            return {...state, dimension: action.type};
        case '3D':
            console.log(action.type);
            return {...state, dimension: action.type};
    }
}

const SkateBuilder = () => {

    const [viewCtrlState, viewCtrlDispatch] = useReducer(viewCtrlReducer, initialState);
    const [galleryCtrlState, galleryCtrlDispatch] = useReducer(galleryCtrlReducer, initialState);
    const [buttonCtrlState, buttonCtrlDispatch] = useReducer(buttonCtrlReducer, initialState);

    return (
        <div className={classes.container}>
            
            {/* Left Hand Side */}
            <div className={classes.sketch}>
                    <div className={classes.sticky}> 
                        <div className={classes.buttonControllers}>
                                <ButtonController 
                                btn1Name='Save to MyBoards' 
                                btn2Name='Add to cart'
                                />
                                <ButtonController 
                                btn1Name='3D' 
                                btn2Name='2D'
                                click={(event) => buttonCtrlDispatch({type: event.target.id.replace('Btn', '')})}
                                />
                            </div>

                        <P5Wrapper
                        sketch={Sketch}
                        skateTexture={require('./../../assets/Skateboard/textura.png')}
                        cameraCoord={viewCtrlState.cameraCoord}
                        view={viewCtrlState.view}
                        zoom={viewCtrlState.zoom}
                        deckTop={galleryCtrlState.deckTop}
                        deckMiddle={galleryCtrlState.deckMiddle}
                        deckBottom={galleryCtrlState.deckBottom}
                        trucks={galleryCtrlState.trucks}
                        wheels={galleryCtrlState.wheels}
                        dimension={buttonCtrlState.dimension}
                        />

                        <CameraController
                        style={classes.cameraController}
                        click={(event) => viewCtrlDispatch({ viewState: event.target.id.replace('Btn', '') })}
                        />

                        <ZoomController 
                        slider={(event) => viewCtrlDispatch({ viewState: viewStates.ZOOM, zoomValue: event.target.value })}
                        default={viewCtrlState.zoom}
                        min={zoomProperties.MIN}
                        max={zoomProperties.MAX}
                        />
                    </div>
                </div>

            {/* Right Hand Side */}
            <div className={classes.galleryContainer}>
                <div className={classes.galleryControllers}>
                    <GalleryController 
                    title='Bottom of the deck'
                    deviceType='Desktop'
                    type={galleryData.deckBottom.type} 
                    instances={generateGalleryInstanceArr(galleryData.deckBottom.count)}
                    click={(event)=> galleryCtrlDispatch({assetID: event.target.closest('button').id})}
                    />
                    <GalleryController 
                    title='Top of the deck'
                    deviceType='Desktop'
                    type={galleryData.deckTop.type} 
                    instances={generateGalleryInstanceArr(galleryData.deckTop.count)}
                    click={(event)=> galleryCtrlDispatch({assetID: event.target.closest('button').id})}
                    />
                    <GalleryController 
                    title='Trucks'
                    deviceType='Desktop'
                    type={galleryData.trucks.type} 
                    instances={generateGalleryInstanceArr(galleryData.trucks.count)}
                    click={(event)=> galleryCtrlDispatch({assetID: event.target.closest('button').id})}
                    />
                    <GalleryController 
                    title='Wheels'
                    deviceType='Desktop'
                    type={galleryData.wheels.type} 
                    instances={generateGalleryInstanceArr(galleryData.wheels.count)}
                    click={(event)=> galleryCtrlDispatch({assetID: event.target.closest('button').id})}
                    />
                </div>
            </div>
           
        </div>
    );
};

export default SkateBuilder;