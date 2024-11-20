import React from "react";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import summaryApi from "../../common";
import fetchWithAuth from "../../helps/fetchWithAuth";
import { toast } from "react-toastify";
import { Radio } from 'antd';


const CheckoutSummary = () => {
  // Lay Cac Item Trong Cart
  const cartItems = useSelector((store) => store.cart.items)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  // Cac Item Duoc Chon Thanh Toan
  const selectedItems = cartItems
    ? cartItems.filter((item) => item.isSelected)
    : [];

  const shipping = 10.0;
  const subtotal = selectedItems
    ? selectedItems.reduce(
      (sum, item) => sum + item.productItem.price * item.quantity,
      0
    )
    : 0;

  const total = subtotal + shipping;


  useEffect(() => {
    setSelectedAddress(JSON.parse(localStorage.getItem("selected-address-id")));
  }, []);

  // Thuc lam tu day
  const handleCheckout = async () => {
    console.log("selectedAddressId at checkout ", selectedAddress);
    const order = {
      orderItems: selectedItems.map(item => ({
        ProductItemId: item.productItem.id,
        Amount: item.quantity,
        Price: item.productItem.price,
        Discount: item.productItem.discount,
      })),
      shippingAddressId: selectedAddress,
      paymentMethod: paymentMethod,
    };

    localStorage.setItem("order", JSON.stringify(order));

    try {
      if( paymentMethod === "COD" ){
        const addOrder = await fetchWithAuth(summaryApi.addOrder.url, {
        method: summaryApi.addOrder.method,
        body: JSON.stringify(order),
        });
        const response = await addOrder.json()
        if( response.respCode === "000"){
          toast.success("Order successful")
          navigate("/order-success")
        } else {
          toast.error("Order failed")
        }
      } else if( paymentMethod === "VNPay" ) {
        // console.log(summaryApi.createOnlinePayment.url + `?amount=${total}`)
        const amount = total + "000";
        const createOnlinePayment = await fetchWithAuth(summaryApi.createOnlinePayment.url + `?amount=${amount}`, {
          method: summaryApi.createOnlinePayment.method,
        })

        const response = await createOnlinePayment.json();
        console.log(response)
        if(response.respCode === "000" ){
          toast.success("Order successful")
          window.location.href = response.data.URL
        } else {
          toast.error("Order failed")
        }
      }

    } catch( error ) {
      
    }

    console.log("selectedItems at checkout ", selectedItems);

  }

  return (
    <Card className="bg-white text-gray-800 shadow-md border border-gray-300">
      <div className="space-y-4">
        <div className=" flex text-lg font-semibold justify-between">
          <h3 className=" text-gray-700">Subtotal (items):</h3>
          <p className="text-gray-800">{cartItems.length}</p>
        </div>

        <div className="flex text-lg font-semibold justify-between">
          <h3 className=" text-gray-700">Price (Total):</h3>
          <p className="text-gray-800">{subtotal.toFixed(2)}đ</p>
        </div>

        <div className="flex text-lg font-semibold justify-between">
          <h3 className=" text-gray-700">Shipping:</h3>
          <p className="text-gray-800">{shipping.toFixed(2)} đ</p>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-6"></hr>

      <div className="my-6 flex justify-between text-lg font-bold text-gray-800">
        <h3>Total:</h3>
        <p>{total.toFixed(2)} đ</p>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-700 font-bold text-lg">Payment Method:</h3>
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="flex flex-col mt-2 space-y-2"
        >
          <Radio value="COD">Cash on Delivery</Radio>
          <Radio value="VNPay">Online Payment (VNPay)</Radio>
        </Radio.Group>
      </div>

      {/* , state: { cartItems: selectedItems } */}
      {/* <Link to={{ pathname: "/checkout" }}> */}
        <button
          className={`w-full py-2 text-lg font-semibold rounded-md mt-2  text-black ${subtotal <= 0
            ? "bg-yellow-500 cursor-not-allowed opacity-50"
            : "bg-yellow-500 hover:bg-yellow-400 hover:text-black"
            }`}
          disabled={subtotal <= 0}
          onClick={handleCheckout}
        >
          Complete Checkout
        </button>
      {/* </Link> */}
    </Card>
  );
};

export default CheckoutSummary;
