import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartSummary = () => {
  const cartItems = useSelector((store) => store.cart.items)

  const shipping = 10.0;
  const selectedItems = cartItems
    ? cartItems.filter((item) => item.isSelected)
    : [];

  const subtotal = selectedItems
    ? selectedItems.reduce(
      (sum, item) => sum + item.productItemResponse.price * item.quantity,
      0
    )
    : 0;

  const total = subtotal + shipping;



  return (
    <Card className="bg-white text-gray-800 shadow-md border border-gray-300">
      <div className="space-y-4">
        <div className=" flex md:text-lg text-base font-semibold justify-between">
          <h3 className=" text-gray-700">Subtotal (items):</h3>
          <p className="text-gray-800">{selectedItems.length}</p>
        </div>

        <div className="flex md:text-lg text-base font-semibold justify-between">
          <h3 className=" text-gray-700">Price (Total):</h3>
          <p className="text-gray-800">{subtotal.toFixed(2)}đ</p>
        </div>

        <div className="flex md:text-lg text-base font-semibold justify-between">
          <h3 className=" text-gray-700">Shipping:</h3>
          <p className="text-gray-800">{shipping.toFixed(2)} đ</p>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-6"></hr>

      <div className="my-6 flex justify-between md:text-lg text-base font-bold text-gray-800">
        <h3>Total:</h3>
        <p>{total.toFixed(2)} đ</p>
      </div>

      {/* , state: { cartItems: selectedItems } */}
      <Link to={{ pathname: "/checkout" }}>
        <button
          className={`w-full py-2 md:text-lg text-base font-semibold rounded-md mt-2  text-black
             ${subtotal <= 0
              ? "bg-yellow-400 cursor-not-allowed opacity-50"
              : "bg-yellow-300 hover:bg-yellow-400 hover:text-black"
            }`}
        >
          Continue to checkout
        </button>
      </Link>
    </Card>
  );
};

export default CartSummary;
