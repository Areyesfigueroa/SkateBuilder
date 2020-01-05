import React from 'react';

const slider = (props) => {
    
    return (
        <div>
            <input type="range" min={props.min} max={props.max} default={props.default} onChange={(event)=>props.change(event.target.value)} />
        </div>
    );
};

export default slider;