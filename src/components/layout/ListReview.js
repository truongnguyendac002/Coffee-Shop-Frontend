import React from "react";
import ReviewItem from "./ReviewItem";

const ListReview = () => {
  const reviews = [
    {
      id: 1,
      username: "huynh_anh2110",
      rating: 4.5,
      date: "2024-09-16 19:21",
      comment: "Chất lượng sản phẩm: ổn",
    },
    {
      id: 2,
      username: "trang_anh123",
      rating: 5,
      date: "2024-09-18 14:10",
      comment: "Sản phẩm tuyệt vời, sẽ quay lại mua tiếp!",
    },
    {
      id: 3,
      username: "nguyen_kien",
      rating: 3,
      date: "2024-09-20 11:30",
      comment: "Chất lượng trung bình, không như kỳ vọng.",
    },
  ];

  return (
    <div className="bg-white p-5 mt-10">
      <div>
        <h3 className="text-xl font-normal mb-5">ĐÁNH GIÁ SẢN PHẨM  </h3>
      </div>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          username={review.username}
          rating={review.rating}
          date={review.date}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default ListReview;
