import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import ListProduct from "../components/homepage/ListProduct";
import { useParams } from "react-router-dom";
import Filter from "../components/homepage/Filter";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryName, categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleFilterProducts = (filtered) => {
    setFilteredProducts(filtered);
    
  };
  const productList = filteredProducts.length > 0 ? filteredProducts : products;
  
  const closeFilter = () => {
    setIsFilterVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchCategory = async () => {
      console.log("id", categoryId);
      console.log("url", summaryApi.getProductByCategory.url + `${categoryId}`);
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

      {products.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      <div className=" grid grid-cols-12 gap-x-10 ">
        <div className="col-span-3 mt-10 min-h-screen">
          <div className="sticky top-28 ">
            <Filter closeFilter={closeFilter} onFilter={handleFilterProducts} />
          </div>
        </div>
        <div className="col-start-4 col-span-9">
          {showList && <ListProduct products={productList} title={categoryName} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
