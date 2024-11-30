import React, { useEffect, useState } from "react";
import { Card, List, Input, Button, Collapse, Rate, Tag, message } from "antd";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});
  const [reviewedItems, setReviewedItems] = useState(new Set()); // Track reviewed items
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const resp = await fetchWithAuth(summaryApi.getUserOrders.url, {
          method: summaryApi.getUserOrders.method,
        });
        const response = await resp.json();
        if (response.respCode === "000") {
          setOrders(response.data);
        } else {
          console.error("Error fetching orders:", response);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const initializeReviewedItems = () => {
      const reviewedSet = new Set();
      orders.forEach((order) => {
        if(order.listReview) {
          order.listReview.forEach((review) => {
            reviewedSet.add(review.orderItem.id);
          });
        }
        
      });
      setReviewedItems(reviewedSet);
    };
  
    if (orders.length > 0) {
      initializeReviewedItems();
    }
  }, [orders]);
  

  const handleReviewChange = (orderItemId, value) => {
    setReviews((prev) => ({
      ...prev,
      [orderItemId]: value,
    }));
  };

  const handleSubmitReview = async (orderItemId) => {
    const reviewData = reviews[orderItemId];
    try {
      const response = await fetchWithAuth(summaryApi.addReview.url, {
        method: summaryApi.addReview.method,
        body: JSON.stringify({
          OrderItemId: orderItemId,
          Rating: reviewData.rating,
          Comment: reviewData.comment,
        }),
      });
      const data = await response.json();
      if (data.respCode === "000") {
        message.success("Review submitted successfully");
        setReviewedItems((prev) => new Set(prev).add(orderItemId)); // Mark item as reviewed
      } else {
        message.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const collapseItems = orders.map((order) => ({
    key: order.orderId,
    label: (
      <>
        <span className="text-lg font-semibold">Order #{order.orderId}</span>
        <span className="ml-4 text-sm text-gray-500">
          {new Date(order.orderDate).toLocaleDateString()}
        </span>
        <Tag
          color={order.orderStatus === "COMPLETED" ? "green" : "red"}
          className="ml-4"
        >
          {order.orderStatus}
        </Tag>
        <Tag color="blue">{order.paymentMethod}</Tag>
      </>
    ),
    children: (
      <List
        className="mb-4"
        dataSource={order.orderItems}
        renderItem={(item) => (
          <Card key={item.id} className="border border-gray-200 shadow-sm my-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.productItem.product.name}</h3>
                <p className="text-gray-500">
                  {item.price.toFixed(2)}đ x {item.amount}
                </p>
                <p className="text-sm text-gray-500">
                  Discount: {item.discount.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                {reviewedItems.has(item.id) ? ( // Check if the item is reviewed
                  <Button type="primary" onClick={() => {
                    navigate(`/product/${item.productItem.product.id}`);
                  }}>
                    Xem sản phẩm
                  </Button>
                ) : (
                  <>
                    <Rate
                      onChange={(value) =>
                        handleReviewChange(item.id, {
                          ...reviews[item.id],
                          rating: value,
                        })
                      }
                      value={reviews[item.id]?.rating || 0}
                      className="mb-2"
                    />
                    <Input.TextArea
                      rows={2}
                      placeholder="Write your review..."
                      value={reviews[item.id]?.comment || ""}
                      onChange={(e) =>
                        handleReviewChange(item.id, {
                          ...reviews[item.id],
                          comment: e.target.value,
                        })
                      }
                      className="mb-2 w-64"
                    />
                    <Button
                      type="primary"
                      onClick={() => handleSubmitReview(item.id)}
                      disabled={!reviews[item.id]?.comment || !reviews[item.id]?.rating}
                    >
                      Submit Review
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        )}
      />
    ),
  }));

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order History</h1>
      <Collapse
        items={collapseItems}
        expandIconPosition="end"
        accordion
        className="bg-white shadow-md rounded-md"
      />
    </div>
  );
};

export default OrderHistory;
