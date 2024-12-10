import React, { useEffect, useState, useCallback } from "react";
import { Card, List, Input, Button, Collapse, Rate, Tag, message, Spin } from "antd";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";



const OrderHistory = React.memo(() => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});
  const [reviewedItems, setReviewedItems] = useState(new Set());
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      console.log("set lodaing TRUE: orderHistory.fetchOrders")
      const resp = await fetchWithAuth(summaryApi.getUserOrders.url, {
        method: summaryApi.getUserOrders.method,
      });
      const response = await resp.json();
      if (response.respCode === "000") {
        if (JSON.stringify(orders) !== JSON.stringify(response.data)) {
          setOrders(response.data);
        }
      } else {
        console.error("Error fetching orders:", response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
   
  }, []);


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const initializeReviewedItems = () => {
      const reviewedSet = new Set();
      orders.forEach((order) => {
        if (order.listReview) {
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
      <>
        <div className="flex justify-center h-screen mt-3">
          <Spin indicator={antIcon} />
        </div>
      </>
    );
  }

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
          <Card key={item.orderItemId} className="border border-gray-200 shadow-sm my-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-gray-500">
                  {item.price.toFixed(2)}đ x {item.amount}
                </p>
                <p className="text-sm text-gray-500">
                  Discount: {item.discount.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                {reviewedItems.has(item.orderItemId) ? ( // Check if the item is reviewed
                  <Button type="primary" onClick={() => {
                    navigate(`/product/${item.productId}`);
                  }}>
                    Xem sản phẩm
                  </Button>
                ) : (
                  <>
                    <Rate
                      onChange={(value) =>
                        handleReviewChange(item.orderItemId, {
                          ...reviews[item.orderItemId],
                          rating: value,
                        })
                      }
                      value={reviews[item.orderItemId]?.rating || 0}
                      className="mb-2"
                    />
                    <Input.TextArea
                      rows={2}
                      placeholder="Write your review..."
                      value={reviews[item.orderItemId]?.comment || ""}
                      onChange={(e) =>
                        handleReviewChange(item.orderItemId, {
                          ...reviews[item.orderItemId],
                          comment: e.target.value,
                        })
                      }
                      className="mb-2 w-64"
                    />
                    <Button
                      type="primary"
                      onClick={() => handleSubmitReview(item.orderItemId)}
                      disabled={!reviews[item.orderItemId]?.comment || !reviews[item.orderItemId]?.rating}
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
});

export default OrderHistory;
