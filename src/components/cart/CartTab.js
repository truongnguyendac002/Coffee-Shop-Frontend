import React from "react";
import image1 from "../../assets/img/img1.jpg";
import { Link, useLocation } from "react-router-dom";
import cartEmpty from "../../assets/img/cart-empty.jpg";

const CartTab = ({ items }) => {
  const location = useLocation();
  const isInCartPage = location.pathname === "/cart";
  const validItems = items.filter((item) => item.productItem);
  const isInProductDetailPage = location.pathname.startsWith("/product/");
  const shouldHideCartTab = isInCartPage || isInProductDetailPage;

  const displayedItems = validItems.slice(0, 4);

  const remainingItemsCount = validItems.length - displayedItems.length;

  return (
    <div
      className={`relative p-4 bg-white rounded-lg shadow-md md:w-80 lg:w-96 ${
        shouldHideCartTab ? "hidden" : ""
      }`}
    >
      <div className="absolute top-0 right-6 w-4 h-4  bg-white rotate-45 transform -translate-y-1/2 "></div>

      {displayedItems.length <= 0 ? (
        <img src={cartEmpty} alt="Cart Empty" className=""></img>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Giỏ Hàng</h2>
          <ul className="mb-4">
            {displayedItems.map((item, index) => (
              <li key={index} className=" border-b py-2">
                <Link to={`/product/${item.productItem.product.id}`}>
                  <div className="grid grid-cols-4 items-start justify-start gap-x-5">
                    <div className="w-12 h-auto col-span-1">
                      <img src={image1} alt="img cartTab item" className="" />
                    </div>

                    <span className="-ml-8 col-span-2 text-gray-700 text-base md:text-sm font-medium overflow-hidden line-clamp-1">
                      {item.productItem.product.name}
                    </span>

                    <span className="col-span-1 font-semibold text-base md:text-sm text-orange-500">
                      {item.price}
                      {item.productItem.price} đ
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {remainingItemsCount > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          +{remainingItemsCount} sản phẩm khác trong giỏ hàng
        </p>
      )}

      {displayedItems.length > 0 ? (
        <Link to="/cart">
          <button className="w-full text-base bg-rose-500 text-white font-semibold py-2 px-4 rounded hover:bg-rose-600">
            Xem Giỏ Hàng
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartTab;