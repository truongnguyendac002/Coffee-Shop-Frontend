import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import summaryApi from "../../common";

const ListReview = ({productId}) => {

  const [reviews, setReviews] = useState([]) ;
  // const reviewList = [
  //   {
  //     id: 1,
  //     Name: "huynh_anh2110",
  //     rating: 4.5,
  //     date: "2024-09-16 19:21",
  //     comment: "Chất lượng sản phẩm: ổn",
  //   },
  //   {
  //     id: 2,
  //     Name: "trang_anh123",
  //     rating: 5,
  //     date: "2024-09-18 14:10",
  //     comment: "Sản phẩm tuyệt vời, sẽ quay lại mua tiếp!",
  //   },
  //   {
  //     id: 3,
  //     Name: "nguyen_kien",
  //     rating: 3,
  //     date: "2024-09-20 11:30",
  //     comment: "Chất lượng trung bình, không như kỳ vọng.",
  //   },
  // ];

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
          avatar={review.userAvatar}
          username={review.Name || review.userEmail}
          rating={review.rating}
          date={review.createAt}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default ListReview;
