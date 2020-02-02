import React from 'react';
import classes from './CameraController.module.css';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';


const CameraController = (props) => {
    const btnIDs = {
        resetBtn: 'resetBtn',
        dynamicBtn: 'dynamicBtn',
        topBtn: 'topBtn',
        bottomBtn: 'bottomBtn',
        frontBtn: 'frontBtn',
        sideBtn: 'sideBtn'
    };

    const mql = window.matchMedia('(max-width: 460px)');

    const desktopController = (
            <ButtonGroup>
                <Button id={btnIDs.resetBtn} onClick={props.click}>Reset</Button>
                <Button id={btnIDs.dynamicBtn} onClick={props.click}>Dynamic</Button>
                <Button id={btnIDs.topBtn} onClick={props.click}>Top</Button>
                <Button id={btnIDs.bottomBtn} onClick={props.click}>Bottom</Button>
                <Button id={btnIDs.frontBtn} onClick={props.click}>Front</Button>
                <Button id={btnIDs.sideBtn} onClick={props.click}>Side</Button>
            </ButtonGroup>
            );

    const mobileController = (
            <Fragment>
                <ButtonGroup>
                    <Button id={btnIDs.resetBtn} onClick={props.click}>Reset</Button>
                    <Button id={btnIDs.dynamicBtn} onClick={props.click}>Dynamic</Button>
                    <Button id={btnIDs.topBtn} onClick={props.click}>Top</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button id={btnIDs.bottomBtn} onClick={props.click}>Bottom</Button>
                    <Button id={btnIDs.frontBtn} onClick={props.click}>Front</Button>
                    <Button id={btnIDs.sideBtn} onClick={props.click}>Side</Button>
                </ButtonGroup>
            </Fragment>
            );

    const [controller, setController] = useState(null);

    useEffect(() => {
        //Set initial value:
        mql.addListener(() => setController(mql.matches ? mobileController : desktopController));
        setController(mql.matches ? mobileController : desktopController);
        
        return () => {
            mql.removeListener(() => setController(mql.matches ? mobileController : desktopController));
        }
    }, []);


    return (
        <div className={classes.CameraController}>
            {controller}
        </div>
    );
};

export default CameraController;