import React, { useEffect, useState, useCallback , useMemo } from "react";
import { useLocation } from "react-router-dom";
import summaryApi from "../common";
import ListProduct from "../components/homepage/ListProduct";
import Filter from "../components/homepage/Filter";

const SearchProduct = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [onClickFilter , setOnClickFilter] = useState(false);

  const handleFilterProducts = (filtered) => {
    setFilteredProducts(filtered);
  };
  const handleClickFilter = () => {
    setOnClickFilter(true);
  };
  const productList = useMemo(() => {
    return filteredProducts.length > 0 ? filteredProducts : products;
  }, [filteredProducts, products]);
  


  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");


  const fetchSearchProduct = useCallback(async () => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await fetch(
        summaryApi.searchProduct.url + `?q=${searchTerm}`,
        {
          method: summaryApi.searchProduct.method,
        }
      );
      const dataResponse = await response.json();
      if (dataResponse.respCode === "000") {
        setProducts(dataResponse.data);
      } else {
        console.log("Error fetching search data");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchSearchProduct();
  }, [fetchSearchProduct]);

  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [products]);

  const title = `Sản Phẩm liên quan đến "${searchTerm}" :`;

  return (
    <div className="container mx-auto">
      {loading && <p className="text-lg text-center">Loading ...</p>}


      <div className=" grid grid-cols-12 gap-x-10 ">
        <div className="col-span-3 mt-10 min-h-screen">
          <div className="sticky top-28 ">
            <Filter  onFilter={handleFilterProducts} products={productList} onClickFilter={handleClickFilter} />
          </div>
        </div>
        
         {((filteredProducts.length === 0 && onClickFilter) || productList.length === 0 ) ? (
          <div className="col-start-4 col-span-9 bg-white shadow-md mt-10 ">
            <p className="text-center text-lg font-bold text-gray-500 ">
              No results found
            </p>
          </div>
        ) : (
          <div className="col-start-4 col-span-9">
            {showList && (
              <ListProduct products={productList} title={title} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
