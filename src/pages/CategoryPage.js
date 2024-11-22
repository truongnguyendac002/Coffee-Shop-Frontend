import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import ListProduct from "../components/homepage/ListProduct";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryName, categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false); 

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
      }finally {
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
    <div className="container  mx-auto flex">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      {products.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {showList && <ListProduct products={products} title={categoryName} />}
    </div>
  );
};

export default CategoryPage;
