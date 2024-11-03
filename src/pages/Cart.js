import React from 'react';
import { FiTrash2, FiHeart, FiMinus, FiPlus } from 'react-icons/fi';
import { IoIosArrowBack } from "react-icons/io";


function Checkout() {
  const items = [
    {
      id: 1,
      name: "Coffee Beans - Espresso Arabica and Robusta Beans",
      price: 47.00,
      brand: "LavAzza",
      inStock: true,
      quantity: 1,
      // imgSrc: "path/to/image1.jpg" 
    },
    {
      id: 2,
      name: "Lavazza Coffee Blends - Try the Italian Espresso",
      price: 106.00,
      brand: "LavAzza",
      inStock: true,
      quantity: 1,
      // imgSrc: "path/to/image2.jpg"
    },
    {
      id: 3,
      name: "Qualità Oro Mountain Grown - Espresso Coffee Beans",
      price: 38.65,
      brand: "LavAzza",
      inStock: true,
      quantity: 1,
      // imgSrc: "path/to/image3.jpg"
    }
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Left Section: Items List */}
        <div className="w-full lg:w-2/3 bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>
          {items.map(item => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
              <img src={item.imgSrc} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>{item.inStock ? 'In Stock' : 'Out of Stock'}</p>
                <p className="text-gray-500 text-sm">{item.brand}</p>
                <div className="flex items-center mt-2">
                  <button className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300">
                    <FiMinus />
                  </button>
                  <span className="px-4 border-t border-b">{item.quantity}</span>
                  <button className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300">
                    <FiPlus />
                  </button>
                  <button className="ml-4 text-gray-500 hover:text-gray-700 flex items-center">
                    <FiHeart className="mr-1" /> Save
                  </button>
                  <button className="ml-4 text-red-500 hover:text-red-700 flex items-center">
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </div>
              </div>
              <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <button className="mt-4 text-500 flex items-center group">
          <IoIosArrowBack className="mr-1 text-lg transition-transform duration-200 group-hover:-translate-x-1" />
          Continue Shopping
          </button>

        </div>

        {/* Right Section: Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 shadow rounded-lg space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between text-gray-700">
              <p>Subtotal ({items.length} items)</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <p>Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 mt-4">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <button className="mt-6 w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600">
              Continue to checkout
            </button>
          </div>
          <div className="bg-purple-100 p-6 shadow rounded-lg text-center">
            <p className="text-purple-600 font-semibold">Send this order as a gift.</p>
            <p className="text-sm text-gray-500">Available items will be shipped to your gift recipient.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
