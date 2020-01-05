import React, {useState} from 'react';
import './App.css';

//Components
import P5Wrapper from 'react-p5-wrapper';
import sketch from './components/Sketch/sketch';
//import SketchControls from './components/SketchControls/SketchControls';
//import Slider from './components/Slider/Slider';

function App() {

  //TODO: Experiment creating a slider to contol zoom.
  //Experiement in creating a button to reset the z-axis to normal.
  //Set state using hooks.

  const buttonIDs = {
    changeColorBtn: 'changeColorBtn',
    resetCameraBtn: 'resetViewBtn'
  }
  const [color, setColor] = useState(null);
  const [cameraCoord, setCameraCoord] = useState([0,0,350, 0,0,0, 0,1,0]);
  const [btnCaller, setBtnCaller] = useState(null);

  const changeColorHandler = (event, color=[255, 0, 0]) => {
    setBtnCaller(event.target.id);
    setColor(color);
  }

  const resetCameraHandler = (event, coord=[0,0,350, 0,0,0, 0,1,0]) => {
    setBtnCaller(event.target.id);
    setCameraCoord(coord);
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
        />

        {/** On Change Prop trigger. */}
        <button id={buttonIDs.changeColorBtn} onClick={changeColorHandler}> 
            Change Color
        </button>
        <button id={buttonIDs.resetCameraBtn} onClick={resetCameraHandler}>
          Reset Camera
        </button>
      </div>


    </div>
  );
}

export default App;
