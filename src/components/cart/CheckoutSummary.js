import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartItems }) => {
  console.log("render cart summary");
  console.log("Cart item at summary:", cartItems);
  const shipping = 10.00;
  const selectedItems = cartItems
    ? cartItems.filter(item => item.isSelected) 
    : [];

  const subtotal = selectedItems
    ? selectedItems.reduce((sum, item) => sum + item.productItem.price * item.quantity, 0)
    : 0;

  const total = subtotal + shipping;

  return (
    <Card className="bg-white text-gray-800 shadow-md border border-gray-300">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Subtotal (items):</h3>
        <p className="text-gray-800">${subtotal.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Shipping:</h3>
        <p className="text-gray-800">${shipping.toFixed(2)}</p>
      </div>
      <div className="mb-4 text-lg font-bold text-gray-800">
        <h3>Total:</h3>
        <p>${total.toFixed(2)}</p>
      </div>

      {/* Truyền chỉ những item được chọn */}
      <Link to={{ pathname: "/checkout", state: { cartItems: selectedItems } }}>
        <button
          className={`w-full py-2 rounded-md mt-2 text-white ${
            subtotal <= 0
              ? "bg-yellow-500 cursor-not-allowed opacity-50"
              : "bg-yellow-500 hover:bg-yellow-400"
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
