import React, { useEffect, useState } from "react";

import CategoryCard from "../layout/CategoryCard";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

import summaryApi from "../../common";

// const listCategory = [
//   {
//     name: "New Sumatra Mandheling Coffee Blend",
//     description: "Rich and smooth coffee beans from Sumatra.",
//     price: "$24 - $150",
//     image: image1,
//   },
//   {
//     name: "Espresso Arabica and Robusta Beans",
//     description: "Perfect blend for espresso lovers.",
//     price: "$37 - $160",
//     image: image2,
//   },
//   {
//     name: "Lavazza Top Class Whole Bean Coffee Blend",
//     description: "Premium blend for an exceptional taste ",
//     price: "$32 - $160",
//     image: image1,
//   },
//   {
//     name: "Lavazza Top Class Whole Bean Coffee Blend",
//     description: "Premium blend for an exceptional taste ",
//     price: "$32 - $160",
//     image: image2,
//   },
// ];

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const endIndex = startIndex + itemsPerPage;
  const visibleCategory = categories.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryResponse = await fetch(summaryApi.allCategory.url, {
          method: summaryApi.allCategory.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataResult =await categoryResponse.json();
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
      <div className="container w-full mx-auto mt-10">
        <div>
          <h2 className="font-bold text-2xl bg-white shadow-sm rounded px-4">
            Browse Categories
          </h2>
        </div>
        <div className="flex flex-wrap justify-between gap-y-6 mt-10">
          {visibleCategory.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className= {`px-4 py-2 rounded-l ${startIndex === 0 ? "bg-gray-200 cursor-not-allowed" :"bg-gray-300 hover:bg-gray-400"}`}
          >
            <MdArrowBackIos />
          </button>

          <button
            onClick={handleNext}
            disabled={endIndex === categories.length }
            className={`px-4 py-2 rounded-r ${
              endIndex === categories.length  ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListCategory;
