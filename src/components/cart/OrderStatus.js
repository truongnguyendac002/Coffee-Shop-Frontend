import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common";
import { toast } from "react-toastify";

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [status, setStatus] = useState(queryParams.get("status"));
  const txnRef = queryParams.get("txnRef");
  const transactionNo = queryParams.get("transactionNo");
  const amount = queryParams.get("amount");
  const payDate = queryParams.get("payDate");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleOrderProcessing = async () => {
    if (status === "success") {
      try {
        const order = JSON.parse(localStorage.getItem("order"));

        const addOrderResponse = await fetchWithAuth(summaryApi.addOrder.url, {
          method: summaryApi.addOrder.method,
          body: JSON.stringify(order),
        });
        const responseOrder = await addOrderResponse.json();

        if (responseOrder.respCode === "000") {
          toast.success("Đặt hàng thành công");

          if (txnRef) {
            const addTransactionResponse = await fetchWithAuth(
              summaryApi.addTransaction.url,
              {
                method: summaryApi.addTransaction.method,
                body: JSON.stringify({
                  TransactionNo: transactionNo,
                  TxnRef: txnRef,
                  PayDate: payDate,
                  Amount: amount,
                  OrderId: responseOrder.data.id,
                  UserId: user.id,
                }),
              }
            );
            const responseTran = await addTransactionResponse.json();

            if (responseTran.respCode !== "000") {
              setStatus("fail");
              toast.error("Đặt hàng không thành công");
            }
          }
        } else {
          setStatus("fail");
          toast.error("Đặt hàng không thành công");
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi xử lý đơn hàng:", error);
        setStatus("fail");
      }
    }
    localStorage.removeItem("order");
  };

  useEffect(() => {
    handleOrderProcessing();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {status === "success" ? (
        <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-md text-center">
          <div className="text-green-500">
            <svg
              className="w-16 h-16 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mt-4">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-700 mt-2">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ để xác nhận đơn hàng.
          </p>
          {txnRef && (
            <div className="text-left mt-4 text-gray-600">
              <p>
                <strong>Mã giao dịch:</strong> {txnRef}
              </p>
              <p>
                <strong>Số giao dịch:</strong> {transactionNo}
              </p>
              <p>
                <strong>Số tiền:</strong> {amount} VND
              </p>
              <p>
                <strong>Ngày thanh toán:</strong> {payDate}
              </p>
            </div>
          )}
          <div className="mt-6 space-x-4">
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Tiếp tục mua hàng
            </button>
            <button
              onClick={() => navigate("/order-detail")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Xem chi tiết đơn hàng
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-md text-center">
          <div className="text-red-500">
            <svg
              className="w-16 h-16 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mt-4">
            Đặt hàng không thành công!
          </h1>
          <p className="text-gray-700 mt-2">
            Rất tiếc, đơn hàng đặt không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
          <div className="mt-6">
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;