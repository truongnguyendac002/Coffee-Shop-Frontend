import React, { useState, useEffect } from "react";
// Slide data
const slides = [
  {
    id: 1,
    text: "ORDER YOUR FAVORITE COFFEE",
    // image: image1,
    bgColor: "bg-blue-200",
  },
  {
    id: 2,
    text: "DISCOVER NEW FLAVORS",
    // image: image1,
    bgColor: "bg-yellow-200",
  },
  {
    id: 3,
    text: "FRESHLY ROASTED BEANS",
    // image: image1,
    bgColor: "bg-pink-200",
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-64 mt-10  ${slides[currentSlide].bgColor} rounded-lg flex items-center`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Text */}
        <div className="text-3xl font-bold text-white">
          {slides[currentSlide].text}
        </div>
        
        {/* Image */}
        <div className="w-1/3">
          <img
            src={slides[currentSlide].image}
            alt="Coffee"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
