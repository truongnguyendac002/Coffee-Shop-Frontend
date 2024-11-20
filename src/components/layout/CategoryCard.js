import React from "react";
import image1 from "../../assets/img/img1.jpg";

const CategoryCard = ({category}) => {
  return (
    <div className=" grid grid-cols-4 items-center rounded-lg overflow-hidden shadow-lg px-4  bg-gray-150 ">
      
      {/* <img className="w-28 h-28 bg-white rounded-2xl object-cover" src={category.image} alt={"img category "} /> */}
      <img className="w-16 h-16 bg-white rounded-lg object-cover" src={image1} alt={"img category "} />

      <div className="col-start-2 col-span-3 px-4 py-2">
        <div className=" font-bold text-xl  line-clamp-1">{category.name}</div>
        {/* <p className="text-gray-700 text-base font-normal line-clamp-2 ">{category.description}</p> */}
        <p className="text-gray-700 text-base font-normal line-clamp-2 ">{"Rich and smooth coffee beans from Sumatra."}</p>
        
      </div>
    </div>
  );
};

export default CategoryCard;
