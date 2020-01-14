import React from 'react';
import classes from './EditableText.module.css';


/**
 * 1. Set the title you are going to change.
 * 2. Set default and edit state on css.
 * 3. Create handleInput Logic
 * 4. Cap width
 * 4. create edit button
 */

const EditableText = (props) => {

    const maxLength = props.maxLength ? props.maxLength: 17;
    const presetName = props.placeholderText;

    return (
        <div className={classes.EditableText}>
            <h1>
                <input
                maxLength={maxLength}
                type='text'
                defaultValue={presetName} 
                />
            </h1>
        </div>
    );
}

export default EditableText;