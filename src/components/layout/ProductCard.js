import React from "react";
import image1 from "../../assets/img/img1.jpg";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const rating = "4.3";
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <>
      <div
        className="max-w-60  bg-white rounded border p-3 overflow-hidden shadow-lg"
        onClick={handleCardClick}
      >
        <img
          className="w-full rounded object-cover"
          src={image1}
          alt={product.name}
        />
        <div className="mt-4">
          <div className="font-medium text-base ">{product.name}</div>
          <p className="text-gray-400 text-sm font-normal mt-1">
            {product.brand.name}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-medium text-red-500">{product.price} đ</span>
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="ml-1 font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
