import React, { useEffect, useState } from "react";
import ProductCard from "../layout/ProductCard";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useRef } from "react";
import summaryApi from "../../common";
import { LoadingOutlined } from "@ant-design/icons";

const ListProduct = ({ products: initialProducts, title }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const titleRef = useRef();
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productList = products;
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

  useEffect(() => {
    if (!initialProducts ) {
      const fetchProduct = async () => {
        try {
          setIsLoading(true);
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
        finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    } else {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  return (
    <div className="container bg-white shadow-md p-3 mx-auto mt-10 ">
      {title && (
        <div>
          <h2 ref={titleRef} className="font-bold text-base ">
            {`${title} ( ${productList.length} )`}
          </h2>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center ">
          <LoadingOutlined style={{ fontSize: 48, color: 'red' }} spin />
        </div>
      )}

      {productList.length === 0 ? (
        <div className="text-center text-lg font-bold text-gray-500 mt-5">
          No results found
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-6 md:gap-3 gap-2 mt-5 ">
          {currentProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-l ${currentPage === 1
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
          className={`px-2 py-1 rounded-r ${currentPage === totalPages
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
