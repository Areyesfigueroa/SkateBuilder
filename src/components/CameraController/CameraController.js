import React from 'react';
import classes from './CameraController.module.css';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const CameraController = (props) => {
    const btnIDs = {
        resetBtn: 'resetBtn',
        dynamicBtn: 'dynamicBtn',
        topBtn: 'topBtn',
        bottomBtn: 'bottomBtn',
        frontBtn: 'frontBtn',
        sideBtn: 'sideBtn'
    };

    return (
        <div className={classes.CameraController}>
            <ButtonGroup>
                <Button id={btnIDs.resetBtn} onClick={props.click}>Reset</Button>
                <Button id={btnIDs.dynamicBtn} onClick={props.click}>Dynamic</Button>
                <Button id={btnIDs.topBtn} onClick={props.click}>Top</Button>
                <Button id={btnIDs.bottomBtn} onClick={props.click}>Bottom</Button>
                <Button id={btnIDs.frontBtn} onClick={props.click}>Front</Button>
                <Button id={btnIDs.sideBtn} onClick={props.click}>Side</Button>
            </ButtonGroup>
        </div>
    );
};

export default CameraController;