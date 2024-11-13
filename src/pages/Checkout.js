import React, { useEffect, useState } from 'react';
import CheckoutSummary from '../components/cart/CartSummary';
import ShippingAddress from '../components/cart/ShippingAddress';
import { useSelector } from 'react-redux';
import summaryApi from '../common';
import fetchWithAuth from '../helps/fetchWithAuth';
import Cookies from "js-cookie";

function Checkout() {
  const user = useSelector((state) => state?.user?.user);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  console.log("cart at checkout:", cartItems)

  useEffect(() => {
    const cartData = JSON.parse(Cookies.get("cart-item-list"));
    setCartItems(cartData)
  }, []);


  useEffect(() => {
    const fetchAddresses = async () => {
      console.log("fetchAddresses at checkout");
      setLoading(true);
      try {
        const response = await fetchWithAuth(
          summaryApi.getAddressByUser.url + user.id,
          { method: summaryApi.getAddressByUser.method }
        );
        const responseData = await response.json();

        if (responseData.respCode === "000" && responseData.data) {
          setAddresses(responseData.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchAddresses();
  }, [user]);

  if(loading) {
    return (
      <p>Checkout page ...</p>
    )
  }
  else
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-2/3">
          <ShippingAddress addresses={addresses} setAddresses={setAddresses} />
        </div>
        <div className="w-full lg:w-1/3">
          <CheckoutSummary cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
