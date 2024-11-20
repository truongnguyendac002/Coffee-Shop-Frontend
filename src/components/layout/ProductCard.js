import React from "react";
import image1 from "../../assets/img/img1.jpg";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const price = "$47.00";
  const rating= "4.3";
  const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }
  return (
    <>
      <div 
      className="max-w-60  bg-white rounded-2xl p-4 overflow-hidden shadow-lg"
      onClick={handleCardClick}
      >
        {/* <img className="w-full rounded-e-xl object-cover" src={product.default_image} alt={product.name} /> */}
        <img className="w-full rounded-e-xl object-cover" src={image1} alt={product.name} />
        <div className="space-y-4 mt-4">
          <div className="font-medium text-base ">{product.name}</div>
          <p className="text-gray-400 text-sm font-normal">{product.brand.name}</p>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">{product.price} đ</span>
            {/* <span className="text-base font-medium">{price}</span> */}
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">★</span>
              {/* <span className="ml-1 font-medium">{product.rating}</span> */}
              <span className="ml-1 font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
