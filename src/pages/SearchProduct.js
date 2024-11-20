import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import summaryApi from "../common";
import ListProduct from "../components/homepage/ListProduct";

const SearchProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false); 

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
        setData(dataResponse.data);
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
    if (data.length > 0) {
      const timer = setTimeout(() => {
        setShowList(true); 
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [data]);

  const title = `Sản Phẩm liên quan đến "${searchTerm}" :`;

  return (
    <div className="container mx-auto">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {showList && <ListProduct products={data} title={title} />}
    </div>
  );
};

export default SearchProduct;
