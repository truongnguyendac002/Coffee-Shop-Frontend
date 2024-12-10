import React, { useState } from "react";
import { Card, InputNumber, Button, Checkbox } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common";
import { useDispatch } from "react-redux";
import {
  addToCart,
  toggleSelected,
  removeFromCart,
} from "../../store/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { message } from "antd";

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch();

  const [errorItemId, setErrorItemId] = useState(null);

  const handleQuantityChange = (value, item) => {
    if (value < 1 || value > item.productItem.stock) {
      triggerError(item);
    } else {
      const updatedItem = { ...item, quantity: value };
      setErrorItemId(null);
      try {
        console.log("da chay den day");
        if (updatedCartItems(updatedItem)) {
          dispatch(addToCart(updatedItem));
        } else console.log("update false");
      } catch (error) {
        toast.error("Error updating cart item");
      }
    }
  };
  const updatedCartItems = async (item) => {
    console.log("da chay den day 2");
    try {
      const response = await fetchWithAuth(summaryApi.updateCartItem.url, {
        method: summaryApi.updateCartItem.method,
        body: JSON.stringify({
          Quantity: item.quantity,
          ProductItemId: item.productItem.id,
          UserId: item.userId,
        }),
      });
      const result = await response.json();
      console.log("result", result);
      if (result.respCode === "000") {
        return true;
      }
    } catch (error) {
      toast.error("Error updating cart item");
      console.error("Error updating cart item:", error);
    }
    return false;
  };

  const triggerError = (item) => {
    setErrorItemId(item.id);
    setTimeout(() => setErrorItemId(null), 500);
  };

  const handleSelectItem = (item) => {
    dispatch(toggleSelected(item.id));
  };

  const handleDeleteCartItem = async (itemId) => {
    try {
      const response = await fetchWithAuth(
        summaryApi.deleteCartItem.url + itemId,
        {
          method: summaryApi.deleteCartItem.method,
        }
      );
      const result = await response.json();
      if (result.respCode === "000") {
        console.log("Delete cart item successfully");
        message.success("Delete cart item successfully");
        dispatch(removeFromCart(itemId));
      }
    } catch (error) {
      message.error(" Error delete cart item");
      console.error("Error delete cart item:", error);
    }
  };

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <Card key={item.id} className="bg-white shadow-md border rounded-md ">
          <div className="flex flex-row items-center justify-between sm:space-x-5 space-x-2 space-y-4 sm:space-y-0">
            {/* Checkbox */}
            <Checkbox
              checked={item.isSelected}
              onClick={() => handleSelectItem(item)}
              className="sm:mr-6 "
            />
            {console.log("item", item)}
            {/* Image */}
            <img
              src={
              //   item.productItem.product.images[0]?
              //   item.productItem.product.images[0].url:
                "https://media.licdn.com/dms/image/v2/C5112AQEw1fXuabCTyQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1581099611064?e=1736380800&v=beta&t=_b3qxld3t1gqDcKHKKtPDxuhIFU94zB31rb2nuc5Ygw"
              }
              alt={item.productItem.product.name}
              className="w-20 h-20 sm:w-16 sm:h-16 object-cover "
            />

            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div onClick={() => handleSelectItem(item)}>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.productItem.product.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Type: {item.productItem.type.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block  ">
                  Category: {item.productItem.product.category.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block ">
                  Brand: {item.productItem.product.brand.name}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center mt-2 sm:mt-0 space-x-1 sm:space-x-2">
                <Button
                  type="default"
                  icon={<MinusOutlined />}
                  onClick={() => handleQuantityChange(item.quantity - 1, item)}
                  className="sm:w-8  w-4 h-8"
                />
                <InputNumber
                  min={1}
                  max={item.productItem.stock}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(value, item)}
                  controls={false}
                  className={`sm:w-12 w-8 h-8 text-sm text-center border rounded-md transition-all duration-500 ${
                    errorItemId === item.id
                      ? "border-red-500 animate-shake"
                      : "border-gray-300"
                  }`}
                />
                <Button
                  type="default"
                  icon={<PlusOutlined />}
                  onClick={() => handleQuantityChange(item.quantity + 1, item)}
                  className="sm:w-8  w-4 h-8"
                />
              </div>
            </div>

            <div className="text-sm sm:text-base font-semibold text-red-500">
              ${(item.productItem.price * item.quantity).toFixed(2)}
            </div>

            {/* Delete */}
            <div
              onClick={() => handleDeleteCartItem(item.id)}
              className="text-xl sm:text-2xl ml-4 hover:text-red-500 cursor-pointer"
            >
              <RiDeleteBin6Line />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CartItems;
