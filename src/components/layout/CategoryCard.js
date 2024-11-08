import React from "react";
import image1 from "../../assets/img/img1.jpg";

const CategoryCard = ({category}) => {
  return (
    <div className=" w-full sm:w-[48%] lg:w-[30%]  flex items-center rounded-2xl overflow-hidden shadow-lg  p-5 bg-gray-150 ">
      
      {/* <img className="w-28 h-28 bg-white rounded-2xl object-cover" src={category.image} alt={"img category "} /> */}
      <img className="w-28 h-28 bg-white rounded-2xl object-cover" src={image1} alt={"img category "} />

      <div className="max-w-[65%] px-6 py-4">
        <div className=" font-bold text-xl mb-2 line-clamp-1">{category.name}</div>
        {/* <p className="text-gray-700 text-base font-normal line-clamp-2 ">{category.description}</p> */}
        <p className="text-gray-700 text-base font-normal line-clamp-2 ">{"Rich and smooth coffee beans from Sumatra."}</p>
        
      </div>
    </div>
  );
};

export default CategoryCard;
