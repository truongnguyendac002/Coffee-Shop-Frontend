import React, { useEffect, useState, useMemo } from "react";
import summaryApi from "../common";
import ListProduct from "../components/homepage/ListProduct";
import { useParams } from "react-router-dom";
import Filter from "../components/homepage/Filter";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryName, categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [onClickFilter , setOnClickFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilterProducts = (filtered) => {
    setFilteredProducts(filtered);
  
  };
  const handleClickFilter = () => {
    setOnClickFilter(true);
  };
  const productList = useMemo(() => {
    return filteredProducts.length > 0 ? filteredProducts : products;
  }, [  products , filteredProducts]);

  useEffect(() => {
    setLoading(true);
    const fetchCategory = async () => {
      try {
        const categoryResponse = await fetch(
          summaryApi.getProductByCategory.url + `${categoryId}`,
          {
            method: summaryApi.getProductByCategory.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataResult = await categoryResponse.json();
        if (dataResult.respCode === "000") {
          setProducts(dataResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <div className="container  mx-auto ">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      <div className=" grid grid-cols-12 lg:gap-x-10 gap-x-3">
        <div className="lg:col-span-3 md:col-span-4 col-span-12 mt-10 sm:min-h-screen ">
          <div className="sticky top-28 ">
            <Filter onFilter={handleFilterProducts} onClickFilter={handleClickFilter} products={products} />
          </div>
        </div>

        {((filteredProducts.length === 0 && onClickFilter) || productList.length === 0 ) ? (
          <div className="lg:col-start-4 lg:col-span-9 md:col-start-5 md:col-span-8 bg-white shadow-md mt-10 ">
            <p className="text-center text-lg font-bold text-gray-500 ">
              No results found
            </p>
          </div>
        ) : (
          <div className="lg:col-start-4 lg:col-span-9 md:col-start-5 md:col-span-8  col-span-12">
            {showList && (
              <ListProduct products={productList} title={categoryName} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
