import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const CartSummary = ({ cartItems }) => {
  console.log("first ", cartItems);

  const shipping = 10.0;
  const selectedItems = cartItems
    ? cartItems.filter((item) => item.isSelected)
    : [];

  const subtotal = selectedItems
    ? selectedItems.reduce(
        (sum, item) => sum + item.productItem.price * item.quantity,
        0
      )
    : 0;

  const total = subtotal + shipping;

  return (
    <Card className="bg-white text-gray-800 shadow-md border border-gray-300">
      <div className="space-y-4">
        <div className=" flex text-lg font-semibold justify-between">
          <h3 className=" text-gray-700">Subtotal (items):</h3>
          <p className="text-gray-800">{selectedItems.length}</p>
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
      <hr class="border-t border-gray-300 mt-6"></hr>

      <div className="my-6 flex justify-between text-lg font-bold text-gray-800">
        <h3>Total:</h3>
        <p>{total.toFixed(2)} đ</p>
      </div>

      {/* , state: { cartItems: selectedItems } */}
      <Link to={{ pathname: "/checkout" }}>
        <button
          className={`w-full py-2 text-lg font-semibold rounded-md mt-2  text-black ${
            subtotal <= 0
              ? "bg-yellow-500 cursor-not-allowed opacity-50"
              : "bg-yellow-500 hover:bg-yellow-400 hover:text-black"
          }`}
          disabled={subtotal <= 0}
        >
          Continue to checkout
        </button>
      </Link>
    </Card>
  );
};

export default CartSummary;
