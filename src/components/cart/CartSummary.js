import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartItems }) => {
  const shipping = 10.00;
  const subtotal = cartItems ? cartItems.reduce((sum, item) => sum + item.productItem.price * item.quantity, 0) : 0;
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

      <Link to="/checkout">
        <button className="bg-yellow-500 hover:bg-yellow-400 w-full py-2 rounded-md mt-2 text-white">
          Continue to checkout
        </button>
      </Link>
    </Card>
  );
};

export default CartSummary;
