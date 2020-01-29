import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ButtonController = (props) => {
    return (
        <ButtonGroup>
            <Button id={`${props.btn1Name}Btn`} onClick={props.click}>{props.btn1Name}</Button>
            <Button id={`${props.btn2Name}Btn`} onClick={props.btn2}>{props.btn2Name}</Button>
        </ButtonGroup>
    );
};

export default ButtonController;