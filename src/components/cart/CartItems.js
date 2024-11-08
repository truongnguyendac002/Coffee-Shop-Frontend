import React, { useState } from 'react';
import { Card, InputNumber, Button, Checkbox } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import fetchWithAuth from '../../helps/fetchWithAuth ';
import summaryApi from '../../common';


const CartItems = ({ cartItems, setCartItems}) => {

  const [errorItemId, setErrorItemId] = useState(null);

  const handleQuantityChange = (value, item) => {
    if (value < 1 || value > item.productItem.stock) {
      triggerError(item);
    } else {
      item.quantity = value;
      setCartItems([...cartItems]);
      setErrorItemId(null);
      updatedCartItems(item);
    }
  };
  const updatedCartItems = async (item) => {
    try {
      const response = await fetchWithAuth(summaryApi.updateCartItem.url, {
        method: summaryApi.updateCartItem.method,
        body: JSON.stringify({
          Quantity: item.quantity,
          ProductItemId: item.productItem.id,
          UserId: item.user.id
        }),
      });
      const result = await response.json();
      if (result.resCode === "200") {
        toast.success("Cart item updated successfully");
      }
    } catch (error) {
      toast.error("Error updating cart item");
      console.error("Error updating cart item:", error);
    }
  };

  const triggerError = (item) => {
    setErrorItemId(item.id);
    setTimeout(() => setErrorItemId(null), 500);
  };

  const handleSelectItem = (item) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, isSelected: !cartItem.isSelected }
        : cartItem
    );
    setCartItems(updatedItems);
  };

  return (
    <div className="space-y-4">
      {cartItems.map(item => (
        <Card key={item.id} className="bg-white shadow-md border rounded-md p-4">
          <div className="flex items-center justify-between">
            <Checkbox
              checked={item.isSelected}
              onClick={() => handleSelectItem(item)}
              className='mr-6'
            />
            <img
              src={'https://media.licdn.com/dms/image/v2/C5112AQEw1fXuabCTyQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1581099611064?e=1736380800&v=beta&t=_b3qxld3t1gqDcKHKKtPDxuhIFU94zB31rb2nuc5Ygw'}
              alt={item.productItem.product.name}
              className="w-16 h-16 object-cover"
            />
            <div className="flex-1 ml-4">
              <div onClick={() => handleSelectItem(item)}>
                <h2 className="text-lg font-semibold text-gray-800">{item.productItem.product.name}</h2>
                <p className="text-gray-600">Type: {item.productItem.type.name}</p>
                <p className="text-gray-600">Category: {item.productItem.product.category.name}</p>
                <p className="text-gray-600">Brand: {item.productItem.product.brand.name}</p>
              </div>

              <div className="flex items-center mt-2 space-x-2">
                <Button
                  type="default"
                  icon={<MinusOutlined />}
                  onClick={() => handleQuantityChange(item.quantity - 1, item)}
                />

                <InputNumber
                  min={1}
                  max={item.productItem.stock}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(value, item)}
                  controls={false}
                  className={`text-center border rounded-md transition-all duration-500 ${errorItemId === item.id ? 'border-red-500 animate-shake' : 'border-gray-300'
                    }`}
                />

                <Button
                  type="default"
                  icon={<PlusOutlined />}
                  onClick={() => handleQuantityChange(item.quantity + 1, item)}
                />
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-800">
              ${(item.productItem.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </Card>
      ))}

    </div>
  );
};

export default CartItems;
