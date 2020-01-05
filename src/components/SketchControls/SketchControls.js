import React from 'react';

const SketchControls = (props) => {
    return (
        <div>
            <button onClick={props.reset}>Reset View</button>
            <input 
            type="range" 
            min={props.min} 
            max={props.max} 
            default={props.default} 
            onChange={(event)=>props.change(event.target.value)} />        
        </div>
    );
};

export default SketchControls;