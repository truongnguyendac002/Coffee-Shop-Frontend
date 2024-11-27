import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import image1 from "../../assets/img/img1.jpg";

const ReviewItem = ({ username, rating, date, comment , avatar}) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-start p-4 border-b bg-white">
      <img src={image1} alt="user" className="rounded-full w-14 h-14 mr-4 object-cover" />
      {/* <img src={avatar} alt="user" className="rounded-full w-14 h-14 mr-4 object-cover" /> */}
      <div className="flex-1">
        <span className="font-semibold">{username}</span>
        <div className="flex mt-2">{renderStars(rating)}</div>
        <div className="text-sm text-gray-500 mt-2">{date}</div>
        <div className="mt-3">{comment}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
