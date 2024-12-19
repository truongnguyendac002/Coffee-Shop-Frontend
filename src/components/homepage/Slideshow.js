import React from "react";
import { Carousel } from "antd";

const slides = [
  { id: 1, image: "https://sondnpt00343.github.io/f8-project-08/assets/img/slideshow/item-1.png" },
  { id: 2, image: "https://sondnpt00343.github.io/f8-project-08/assets/img/slideshow/item-1.png" }
];

const Slideshow = () => {
  return (
    <div className="w-full mt-10 ">
    <Carousel autoplay effect="fade">
      {slides.map((slide) => (
        <div key={slide.id} className="relative w-full h-64 overflow-hidden rounded-md">
          <img
            src={slide.image}
            alt="Slideshow"
            className="w-full h-full object-cover "
          />
        </div>
      ))}
    </Carousel>
  </div>
  
  );
};

export default Slideshow;
