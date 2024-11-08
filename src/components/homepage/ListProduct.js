import React, { useEffect, useState } from "react";
import ProductCard from "../layout/ProductCard";
// import image1 from "../../assets/img/img1.jpg";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useRef } from "react";
import summaryApi from "../../common";

// const products = [
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
//   {
//     name: "Coffee Beans - Espresso Arabica and Robusta Beans",
//     brand: "Lavazza",
//     price: "$47.00",
//     rating: "4.3",
//     image: image1,
//   },
// ];

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const titleRef = useRef();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setTimeout(() => {
        titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await fetch(summaryApi.allProduct.url, {
          method: summaryApi.allProduct.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const productResult = await productResponse.json();

        if (productResult.respCode === "000") {
          setProducts(productResult.data);
          console.log("products list", productResult.data);
        } else {
          console.log("log get all products", productResult.respDesc);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-10 ">
        <h2
          ref={titleRef}
          className="font-bold text-2xl bg-white shadow-sm rounded px-4"
        >
         {`Browse Product ( ${products.length} )` }
        </h2>

        <div className="flex flex-wrap justify-center mt-5 gap-x-5 gap-y-6">
          {currentProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-l ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <MdArrowBackIos />
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-r ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
