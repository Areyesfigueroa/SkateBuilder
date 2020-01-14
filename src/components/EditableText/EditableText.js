import React, {useState} from 'react';
import classes from './EditableText.module.css';


/**
 * 1. Set the title you are going to change.
 * 2. Set default and edit state on css.
 * 3. Create handleInput Logic
 * 4. Cap width
 * 4. create edit button
 */

const EditableText = () => {

    const MAXINPUT = 14;
    let inputWidthOffset = 180;
    const [presetName, setPresetName] = useState('Preset');
    const [fontSize, setFontSize] = useState(60);
    const [inputWidth, setInputWidth] = useState(presetName.length + inputWidthOffset);

    const inputStyle = {
        width: `${inputWidth}px`,
        fontSize: `${fontSize}px`
    }

    const handleInputWidth = (event, width) => {
        
        //Input width is the same size as the input characters.
        //input character lenght + offset * Fontsize
        inputWidthOffset = 22;
        
        if(event.target.value.length < MAXINPUT) {
            console.log(`Increase Width ${event.target.value.length} <= ${MAXINPUT}`);
            setInputWidth(width + event.target.value.length + inputWidthOffset);

        }

    }

    return (
        <div className={classes.EditableText}>
            <h1>
                <input 
                className={classes.edit}
                style={inputStyle}
                maxLength={MAXINPUT}
                type='text'
                defaultValue={presetName} 
                readOnly={false}
                onKeyPress={(event) => handleInputWidth(event, inputWidth)}
                />
            </h1>
            
        </div>
    );
}

export default EditableText;