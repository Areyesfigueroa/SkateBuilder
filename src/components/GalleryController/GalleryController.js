import React, { Fragment } from 'react';
import classes from './GalleryController.module.css';

import Carousel from "react-multi-carousel";
import GalleryItem from "./GalleryItem/GalleryItem";
import "react-multi-carousel/lib/styles.css";



const createGallery = (type, instances, click)=> {
    return instances.map((el) => (   
        <GalleryItem 
        key={`${type}_${el}`}
        imageName={`${type}_${el}`}
        click={click}
        />
    ));
}

const GalleryController = (props) => {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <Fragment>
        <div className={classes.galleryTitle}>{props.title}</div>
        
        <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={5000}
        centerMode
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={true}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        >
        {createGallery(props.type, props.instances, props.click)}
        </Carousel>
      </Fragment>

    );
};

export default GalleryController;

