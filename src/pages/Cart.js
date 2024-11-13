import React, { useEffect } from 'react';
import CartSummary from '../components/cart/CartSummary';
import CartItems from '../components/cart/CartItems';
import Cookies from "js-cookie";
import { useState } from 'react';

function Cart() {
  console.log("render cart");

  const [cartItems, setCartItems] = useState([]);
  console.log("cart at cart page:", cartItems);

  useEffect(() => {
      const cartData = JSON.parse(Cookies.get("cart-item-list"));
      setCartItems(cartData)
  },[] );

  useEffect(() => {
    Cookies.set("cart-item-list", JSON.stringify(cartItems)); 
  }, [cartItems])


  return (
    <>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-2/3">
            <CartItems cartItems={cartItems} setCartItems={setCartItems} />
          </div>
          <div className="w-full lg:w-1/3">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </>
  );

}

export default Cart;
