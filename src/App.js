import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//Components
import P5Wrapper from 'react-p5-wrapper';
import sketch from './components/Sketch/sketch';
//import SketchControls from './components/SketchControls/SketchControls';
//import Slider from './components/Slider/Slider';

//Bootstrap Components
import ButtonGroup from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';

function App() {

  //TODO: Experiment creating a slider to contol zoom.
  //Zoom slider needs current camera coordinates. 


  const buttonIDs = {
    changeColorBtn: 'changeColorBtn',
    resetCameraBtn: 'resetViewBtn',
    changeDeckTextureBtn: 'changeDeckTextureBtn',
    zoomSlider: "zoomSlider",
    viewPanels: "viewPanels"
  }

  const skatePositions = {
    DYNAMIC: "dynamic",
    FRONT: 'front',
    SIDE: 'side',
    TOP: 'top',
    BOTTOM: 'bottom'
}

  //Camera Zoom Properties, TEMP
  const zoomProps = {
    min: 150,
    max: 600,
    default: 600
  }

  //State variables
  const [color, setColor] = useState(null);
  const [cameraCoord, setCameraCoord] = useState([0,0,350, 0,0,0, 0,1,0]);
  const [btnCaller, setBtnCaller] = useState(null);
  const [deckTexture, setDeckTexture] = useState(require('./assets/starwars_example.jpeg'));
  const [zoom, setZoom] = useState(450);
  const [skatePosition, setSkatePosition] = useState(skatePositions.FRONT);

  const changeColorHandler = (event, color=[255, 0, 0]) => {
    setBtnCaller(event.target.id);
    setColor(color);
  }
  const resetCameraHandler = (event, coord=[0,0,350, 0,0,0, 0,1,0]) => {
    setBtnCaller(event.target.id);
    setCameraCoord(coord);
  }
  const changeDeckTextureHandler = (event, texture=require('./assets/volcom-truck-texture.jpg')) => {
    setBtnCaller(event.target.id);
    setDeckTexture(texture);
  }
  const zoomSliderHandler = (event) => {
    setBtnCaller(event.target.id);
    setZoom(event.target.value);
  }
  const changeSkatePos = (position) => {
    setBtnCaller(buttonIDs.viewPanels);
    setSkatePosition(position);
  }

  return (
    <div className="App">
      <h1>TESTING APP</h1>
      <div>
        <P5Wrapper sketch={sketch}
        color={color}
        cameraPos={cameraCoord}
        btnCaller={btnCaller}
        buttonIDs={buttonIDs}
        deckTexture={deckTexture}
        zoom={zoom}

        //Positions
        skatePosition={skatePosition}
        skatePositions={skatePositions}
        />

        {/** On Change Prop trigger. */}
        <button id={buttonIDs.changeColorBtn} onClick={changeColorHandler}> 
            Change Color
        </button>
        <button id={buttonIDs.resetCameraBtn} onClick={resetCameraHandler}>
          Reset Camera
        </button>
        <button id={buttonIDs.changeDeckTextureBtn} onClick={changeDeckTextureHandler}>
          Change Deck
        </button>
        <input id={buttonIDs.zoomSlider} type="range" min={zoomProps.min} max={zoomProps.max} default={zoomProps.default} onChange={zoomSliderHandler} />
        
        <div>
          <Button onClick={()=>changeSkatePos(skatePositions.DYNAMIC)} variant="secondary">Dynamic</Button>
          <Button onClick={()=>changeSkatePos(skatePositions.FRONT)} variant="secondary">Front</Button>
          <Button onClick={()=>changeSkatePos(skatePositions.TOP)} variant="secondary">Top</Button>
          <Button onClick={()=>changeSkatePos(skatePositions.SIDE)} variant="secondary">Side</Button>
          <Button onClick={()=>changeSkatePos(skatePositions.BOTTOM)} variant="secondary">Bottom</Button>
        </div>

      </div>
    </div>
  );
}

export default App;
