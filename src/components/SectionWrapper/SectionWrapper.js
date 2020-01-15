import React from 'react';
import classes from './SectionWrapper.module.css';


const sectionWrapper = (props) => {

    return (
    <section className={classes.SectionWrapper}>
        {props.children}
    </section>
    );
};

export default sectionWrapper;