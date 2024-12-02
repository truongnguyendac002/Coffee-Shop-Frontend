import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { FaStar } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

import image1 from "../assets/img/img1.jpg";
import image2 from "../assets/img/img2.png";
import image3 from "../assets/img/image3.jpg";
import image4 from "../assets/img/image4.jpg";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, toggleSelected } from "../store/cartSlice";
import fetchWithAuth from "../helps/fetchWithAuth";
import { message } from "antd";
import {
  selectFavorites,
  removeFromFavorites,
  addToFavorites,
  setFavorites,
} from "../store/favoritesSlice ";
import ListReview from "../components/layout/ListReview";

const images = [image1, image2, image3, image4];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [productItems, setProductItems] = useState([]);
  const [itemStock, setItemStock] = useState(null);
  const [clickButtonSize, setClickButtonSize] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [productItemPrice, setProductItemPrice] = useState(null);
  const [productItem, setProductItem] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const user = useSelector((store) => store?.user?.user);
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const maxQuantity = itemStock;
  const tabs = ["Description", "Review", "Similar"];
  
  const [isFavorite, setIsFavorite] = useState(false); 

  useEffect(() => {
    if (product) {
      const isProductFavorite = favorites.some(
        (item) => item.product && item.product.id === product.id
      );
      setIsFavorite(isProductFavorite); 
    }
  }, [product, favorites]);



  useEffect(() => {
    const fetchProductItems = async () => {
      try {
        const response = await fetch(summaryApi.productItem.url + `${id}`, {
          method: summaryApi.productItem.method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.respCode === "000") {
          setProductItems(result.data);
          if (result.data.length > 0) {
            setProduct(result.data[0].product);
            setProductItemPrice(result.data[0].price);
          }
        } else {
          console.log("Error:", result.respDesc);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProductItems();
  }, [id]);

  const handlePrevClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };
  const handleNextClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleClickSize = (item) => {
    setItemStock(item.stock);
    setClickButtonSize(item);
    setSelectedDiscount(item.discount);
    setProductItemPrice(item.price);
    setProductItem(item);
    setError(null);
  };

  const handleAddProductToCart = async () => {
    if (!productItem) {
      setError("Bạn cần chọn kích thước sản phẩm trước khi thêm vào giỏ hàng!");
      return;
    }

    try {
      const response = await fetchWithAuth(summaryApi.addCartitem.url, {
        method: summaryApi.addCartitem.method,
        body: JSON.stringify({
          ProductItemId: productItem.id,
          Quantity: quantity,
          UserId: user.id,
        }),
      });

      const data = await response.json();
      if (data.respCode === "000") {
        dispatch(addToCart(data.data));
        message.success("Đã thêm sản phẩm vào giỏ hàng");

        return data.data;
      } else {
        throw new Error("Lỗi khi thêm vào giỏ hàng");
      }
    } catch (error) {
      console.log("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const handleAddToCart = async () => {
    await handleAddProductToCart();
  };

  const handleBuyNow = async () => {
    const addedProduct = await handleAddProductToCart();
    if (addedProduct) {
      dispatch(toggleSelected(addedProduct.id));
      navigate("/checkout");
    }
  };

  const handleClickFavorites = async () => {
    const isAlreadyFavorite = isFavorite;

    if (isAlreadyFavorite) {
      try {
        const response = await fetchWithAuth(summaryApi.deleteFavorites.url, {
          method: summaryApi.deleteFavorites.method,
          body: JSON.stringify({
            ProductId: product.id,
            UserId: user.id,
          }),
        });

        const data = await response.json();
        if (data.respCode === "000") {
          dispatch(removeFromFavorites(product));

          dispatch(
            setFavorites(
              favorites.filter((item) => item.product.id !== product.id)
            )
          );

          message.success("Sản phẩm đã được xóa khỏi danh sách yêu thích");
        } else {
          throw new Error("Lỗi khi xóa sản phẩm vào danh sách yêu thích");
        }
      } catch (error) {
        console.log("Lỗi khi xóa sản phẩm vào danh sách yêu thích:", error);
      }
    } else {
      try {
        const response = await fetchWithAuth(summaryApi.addFavorite.url, {
          method: summaryApi.addFavorite.method,
          body: JSON.stringify({
            ProductId: product.id,
            UserId: user.id,
          }),
        });

        const data = await response.json();
        if (data.respCode === "000") {
          dispatch(addToFavorites(product));
          dispatch(setFavorites([...favorites, { product }]));

          message.success("Sản phẩm đã được thêm vào danh sách yêu thích");
        } else {
          throw new Error("Lỗi khi thêm sản phẩm vào danh sách yêu thích");
        }
      } catch (error) {
        console.log("Lỗi khi thêm sản phẩm vào danh sách yêu thích:", error);
      }
    }
  };

  const renderContent = (product) => {
    if (!product || !product.brand || !product.category) {
      return <p>Loading...</p>;
    }
    switch (activeTab) {
      case "Description":
        return (
          <>
            <h2 className="text-xl font-bold mt-10">Chi tiết sản phẩm</h2>
            <div className="container mx-auto mt-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <ul>
                  <li className="flex justify-start border-b py-2">
                    <span className="font-semibold w-1/4">Thương hiệu:</span>
                    <span>{product.brand.name}</span>
                  </li>
                  <li className="flex justify-start border-b py-2">
                    <span className="font-semibold w-1/4">Xuất xứ:</span>
                    <span>Việt Nam </span>
                  </li>
                  <li className="flex justify-start border-b py-2">
                    <span className="font-semibold w-1/4">Loại thực phẩm:</span>
                    <span>Đồ uống </span>
                  </li>
                  <li className="flex justify-start border-b py-2">
                    <span className="font-semibold w-1/4">Loại Cafe:</span>
                    <span>{product.category.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <h2 className="text-xl font-bold mt-4">Mô tả sản phẩm</h2>
            <p className="mt-2">
              {product?.description
                ? product.description
                : "Không có mô tả sản phẩm"}
            </p>
          </>
        );
      case "Review":
        return <ListReview productId={product.id}/>;
      case "Similar":
        return <p>Similar products content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Product Image */}
        <div className="p-8 w-full sm:w-2/5 bg-white flex flex-col items-center">
          <img
            className="w-full h-auto lg:w-[450px] lg:h-[400px] object-cover"
            src={images[currentImage]}
            alt="Main product"
          />
          {/* Thumbnails */}
          <div className="mt-8 relative max-w-full w-full">
            <div className="grid grid-cols-4 grid-rows-1 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  className={`w-full h-24 object-cover rounded-lg shadow-md cursor-pointer ${
                    index === currentImage ? "border-2 border-red-500" : ""
                  }`}
                  src={image}
                  alt={`Product ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevClick}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-100 text-gray-800 pr-2 py-2 shadow-md focus:outline-none"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-100 text-gray-800 pr-2 py-2 shadow-md focus:outline-none"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-100 w-full lg:w-3/5 xl:w-1/2 p-8 lg:p-16 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div className="flex items-center mt-8">
              <div className="flex text-yellow-500">
                <FaStar  />
              </div>
              <span className="ml-2 text-gray-700">4.6</span>
              <span className="ml-2 text-gray-700">(1100 reviews)</span>
            </div>

            {/* discount */}
            <div className="mt-8 flex items-baseline justify-start space-x-10">
              <div className="w-1/6">
                <h2 className="text-xl">Discount</h2>
              </div>
              <div className="flex gap-x-4 gap-y-3 flex-wrap">
                {selectedDiscount > 0 ? (
                  <button className="shrink-0 w-28 h-8 border-dashed border-2 bg-red-100  text-red-500 font-semibold rounded-sm text-lg">
                    {`Giảm ${selectedDiscount}k`}
                  </button>
                ) : selectedDiscount === 0.0 ? (
                  <p className="text-red-400">
                    Sản phẩm này không có mã giảm giá
                  </p>
                ) : (
                  <p className="text-red-400">Chọn size để xem mã giảm giá</p>
                )}
              </div>
            </div>

            {/* size */}
            <div className="mt-8 flex items-baseline justify-start space-x-10">
              <div className="w-1/6">
                <h2 className="text-xl">Size</h2>
              </div>
              <div className="flex gap-x-4 gap-y-3 flex-wrap">
                {productItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleClickSize(item)}
                    className={`shrink-0 w-28 h-8 rounded-sm text-sm border-2 ${
                      clickButtonSize === item
                        ? "border-orange-500 text-red-500"
                        : "bg-white hover:border-orange-500 hover:text-red-500"
                    }`}
                  >
                    {item.type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* quantity */}
            <div className="mt-8 flex items-baseline justify-start space-x-10">
              <div className="w-1/6">
                <h2 className="text-xl">Số lượng</h2>
              </div>
              <div className="flex items-center">
                <button
                  onClick={decrement}
                  className="px-4 py-1 text-gray-800 rounded-l focus:outline-none border border-solid"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(maxQuantity, e.target.value))
                    )
                  }
                  className="w-20 px-4 py-1 text-center border-t border-b border-gray-300 focus:outline-none"
                />
                <button
                  onClick={increment}
                  className="px-4 py-1 text-gray-800 rounded-r focus:outline-none border border-solid"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-gray-700">
                {itemStock > 0 ? (
                  `${itemStock.toLocaleString()} sản phẩm có sẵn`
                ) : itemStock === 0 ? (
                  <span className="text-red-400">
                    Hiện tại không còn sản phẩm
                  </span>
                ) : (
                  <span></span>
                )}
              </p>
            </div>

            {/* price item */}
            <div className="mt-8 flex items-baseline justify-start space-x-10">
              <div className="w-1/6">
                <h2 className="text-xl">Giá</h2>
              </div>
              <div className="flex gap-x-4 gap-y-3 flex-wrap">
                <p className="font-semibold text-red-500 text-2xl">
                  {productItemPrice}đ
                </p>
              </div>
            </div>

            <div className="flex mt-8  flex-col">
              {error && <div className="text-red-500 ">{error}</div>}
              <div className="flex space-x-5 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="grow flex items-center justify-center px-4 py-2 bg-red-100 border border-red-500 text-red-500 hover:bg-white"
                >
                  <FaShoppingCart className="mr-2" /> Thêm Vào Giỏ Hàng
                </button>

                <button
                  onClick={handleBuyNow}
                  className="grow px-4 py-2 bg-red-500 text-white hover:bg-red-600"
                >
                  Mua Ngay
                </button>
                {
                  !isFavorite ? (<button
                    onClick={handleClickFavorites}
                    className={`text-gray-500 hover:text-red-500 w-9`}
                  >
                    <FaRegHeart style={{ width: "32px", height: "32px" }} />
                  </button>
                  ) : (<button
                    onClick={handleClickFavorites}
                    className={`text-red-500  w-9 `}
                  >
                    <FaHeart style={{ width: "32px", height: "32px" }} />
                  </button>)

                }
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <div className="flex border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold ${
                activeTab === tab ? "border-b-2 border-orange-500" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">{renderContent(product)}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
