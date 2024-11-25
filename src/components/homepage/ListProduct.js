import React, { useEffect, useState } from "react";
import ProductCard from "../layout/ProductCard";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useRef } from "react";
import summaryApi from "../../common";
import { CiFilter } from "react-icons/ci";
import Filter from "./Filter";
import { useLocation } from "react-router-dom"; // Import useLocation

const ListProduct = ({ products: initialProducts, title }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const titleRef = useRef();
  const filterRef = useRef(null);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const productList = filteredProducts.length > 0 ? filteredProducts : products;
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const currentProducts = productList.slice(
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

  const toggleFilterDropdown = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const closeFilter = () => {
    setIsFilterVisible(false);
  };

  const handleFilterProducts = (filtered) => {
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
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
          }
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchProduct();
    } else {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  // Sử dụng useLocation để lấy thông tin URL hiện tại
  // const location = useLocation();
  // const isSearchPage = location.pathname === "/search";

  return (
    <div className="container bg-white shadow-md p-3 mx-auto mt-10 ">
      {title && (
        <div className="grid grid-cols-2 items-center">
          <div>
            <h2 ref={titleRef} className="font-bold text-base ">
              {`${title} ( ${productList.length} )`}
            </h2>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 mt-5 ">
        {currentProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-l ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <MdArrowBackIos />
        </button>

        <span className="px-2 py-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-r ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
