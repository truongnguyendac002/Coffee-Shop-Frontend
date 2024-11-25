import React, { useEffect, useState } from "react";
import summaryApi from "../../common";
import { Slider, Box, Typography } from "@mui/material";

const Filter = ({ closeFilter, onFilter }) => {
  const [brands, setBrands] = useState([]);
  const [selectBrand, setSelectBrand] = useState("");
  const [value, setValue] = useState([0, 100]);
  const [products, setProducts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 100,
      label: 100,
    },
  ];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(summaryApi.allBrand.url, {
          method: summaryApi.allBrand.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataResponse = await response.json();
        if (dataResponse.respCode === "000") {
          setBrands(dataResponse.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

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
    fetchBrands();
  }, []);

  const handleSelectBrand = (brand) => {
    setSelectBrand(brand.name);
  };

  const handleClickFilter = () => {
    const filtered = products.filter((product) => {
      const inPriceRange =
        product.price >= value[0] && product.price <= value[1];
      const matchesBrand = selectBrand
        ? product.brand.name === selectBrand
        : true;
      return inPriceRange && matchesBrand;
    });

    onFilter(filtered);
    closeFilter();
  };

  return (
    <div className="relative p-6 w-full bg-white rounded-lg shadow-xl">
      <div className="w-full grid grid-cols-1 justify-between items-start gap-y-8">
        <div>
          <Box margin="0 auto">
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.25rem",
                fontWeight: "500",
                marginBottom: "1rem",
              }} 
            >
              Mức giá
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              disableSwap
              marks={marks}
            />
            <Typography>
              Giá trị hiện tại: {value[0] + "đ"} - {value[1] + "đ"}
            </Typography>
          </Box>
        </div>

        {/* Lọc theo thương hiệu */}
        <div className="">
          <p className="text-xl font-semibold mb-4">Brand</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {brands.map((brand, index) => (
              <button
                key={index}
                className={`border rounded p-2 text-nowrap text-sm line-clamp-1 ${
                  selectBrand === brand.name ? "bg-yellow-500 text-white" : ""
                }`}
                onClick={() => handleSelectBrand(brand)}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-10">
        <button onClick={closeFilter} className="border rounded p-2">
          Cancel
        </button>
        <button
          onClick={handleClickFilter}
          className="bg-yellow-500 text-white rounded p-2"
        >
          Show Result
        </button>
      </div>
    </div>
  );
};

export default Filter;
