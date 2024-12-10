import React from "react";
import CartSummary from "../components/cart/CartSummary";
import CartItems from "../components/cart/CartItems";
import { useSelector } from 'react-redux';
import cartEmpty from "../assets/img/cart-empty.jpg";

function Cart() {
 
  const cartItems = useSelector((store) => store.cart.items);
  console.log("cart", cartItems)

  return (
    <>
    {
       cartItems.length > 0  ? (
        <div className="container mx-auto  bg-gray-100 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-2/3">
            <CartItems cartItems={cartItems}  />
          </div>
          <div className="w-full lg:w-1/3">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
       ) : (
        <div className="container mx-auto shadow-lg  flex w-[40%] justify-center items-center">
          <img src={cartEmpty} alt="Cart Empty" className="overflow-hidden object-cover rounded" /> 
        </div>
       )
    }
      
    </>
  );
}

export default Cart;
