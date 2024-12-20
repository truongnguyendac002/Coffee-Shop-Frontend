import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import summaryApi from "../../common";
import { Pagination } from "antd";
import image1 from "../../assets/img/user-default.jpg";

const ListReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(
        summaryApi.getReviewByProductId.url + productId,
        {
          method: summaryApi.getReviewByProductId.method,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.respCode === "000") {
        setReviews(result.data);
        setTotalReviews(result.data.length)
      } else {
        console.log("error Review", result.respDesc);
      }
    };
    fetchReview();
  }, [productId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
   
  };

  const pageSize =  5;
  const startIndex = (currentPage - 1) * pageSize;
  const currentReviews = reviews.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white p-5 mt-10">
      <div>
        <h3 className="md:text-xl text-base font-normal mb-5">
          ĐÁNH GIÁ SẢN PHẨM{" "}
        </h3>
      </div>
      {currentReviews.map((review) => (
        <ReviewItem
          key={review.id}
          avatar={review.userAvatar || image1}
          username={review.Name || `user ${review.userId}`}
          rating={review.rating}
          date={review.createAt}
          comment={review.comment}
        />
      ))}

      <div className="mt-5 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalReviews}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListReview;
