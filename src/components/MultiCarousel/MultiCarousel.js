import React from 'react';
import Carousel from "react-multi-carousel";
import WithScrollbar from "react-multi-carousel";
import GalleryItems from "./../GalleryController/GalleryItems/GalleryItems";
import GalleryItem from "./../GalleryController/GalleryItems/GalleryItem/GalleryItem";
import "react-multi-carousel/lib/styles.css";
 
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const items = (type, click)=> {
    return ['001', '002', '003', '001', '001', '001', '001'].map((el) => (   
        <GalleryItem 
        key={`${type}_${el}`}
        imageName={`${type}_${el}`}
        click={click}
        />
    ));
}

const MultiCarousel = (props) => {

    return (
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
        {items('deck_bottom', ()=>console.log('clicked'))}
        </Carousel>
    );
};

export default MultiCarousel;

