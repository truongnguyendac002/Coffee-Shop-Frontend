import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import summaryApi from "../../common";
import image1 from "../../assets/img/user-default.jpg"

const ListReview = ({productId}) => {

  const [reviews, setReviews] = useState([]) ;
  useEffect(() => {
    const fetchReview = async() => {
      const response = await fetch(summaryApi.getReviewByProductId.url + productId , {
        method: summaryApi.getReviewByProductId.method ,
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      const result = await response.json();
      if(result.respCode === "000") {
        console.log("review" , result)
        setReviews(result.data) ; 
      }else {
        console.log("error Review" , result.respDesc) ;
      }
    } 
    fetchReview()
  } , [productId])

  return (
    <div className="bg-white p-5 mt-10">
      <div>
        <h3 className="md:text-xl text-base font-normal mb-5">ĐÁNH GIÁ SẢN PHẨM  </h3>
      </div>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          avatar={review.userAvatar || image1}
          username={review.Name || `user ${review.userId}` }
          rating={review.rating}
          date={review.createAt}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default ListReview;
