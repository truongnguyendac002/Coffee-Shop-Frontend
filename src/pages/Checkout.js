import React, { useState, useEffect } from 'react';
import CartSummary from '../components/cart/CartSummary';
import { getCartAPI } from '../services/api.service';
import { useSelector } from 'react-redux';
import ShippingAddress from '../components/cart/ShippingAddress';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const response = await getCartAPI(user.id);
          setCartItems(response.data || []);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItems();
    }
  }, [user]);


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
