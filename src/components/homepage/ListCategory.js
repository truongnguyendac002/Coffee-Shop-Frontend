import React, { useEffect, useState } from "react";

import CategoryCard from "../layout/CategoryCard";

import summaryApi from "../../common";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryResponse = await fetch(summaryApi.allCategory.url, {
          method: summaryApi.allCategory.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataResult = await categoryResponse.json();
        if (dataResult.respCode === "000") {
          setCategories(dataResult.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <>
      <div className="container w-full mx-auto mt-10 bg-white min-h-screen p-4 shadow-md rounded-md">
        <div>
          <h2 className="font-bold text-base ">Danh mục</h2>
        </div>
        <div className="mt-4 space-y-1">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListCategory;
