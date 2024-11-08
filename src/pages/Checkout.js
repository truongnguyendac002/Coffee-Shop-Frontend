import React from 'react';
import CartSummary from '../components/cart/CartSummary';
// import { useSelector } from 'react-redux';
import ShippingAddress from '../components/cart/ShippingAddress';
import { useLocation } from 'react-router-dom';


function Checkout() {
  const { cartItems } = useLocation().state || {}; 

  console.log("alo oalso: ",cartItems);
  // const user = useSelector((state) => state?.user?.user);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-2/3">
            <ShippingAddress />
        </div>
        <div className="w-full lg:w-1/3">
          <CartSummary cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
