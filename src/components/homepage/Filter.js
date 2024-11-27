import React, { useEffect, useState } from "react";
import summaryApi from "../../common";
import { Slider, Box, Typography } from "@mui/material";

const Filter = ({ onFilter, products ,onClickFilter }) => {
  const min = 0 ;
  const max = 400;
  const step= 10;
  const [brands, setBrands] = useState([]);
  const [selectBrand, setSelectBrand] = useState("");
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => { 
    setValue(newValue);
  };

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
        : false;
      return inPriceRange && matchesBrand;
    });
    console.log(" setFilteredProducts(filtered);" , filtered )
    onClickFilter();
    onFilter(filtered);
  };

  return (
    <div className="relative p-6 w-full bg-white rounded-lg shadow-xl ">
      <div className="w-full grid grid-cols-1 justify-between items-start gap-y-8">
        <div>
          <Box margin="0 auto">
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Mức giá
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              step={step}
              min={min}
              max={max}
              disableSwap
              // marks={marks}
              sx={{
                width: "100%",
                "& .MuiSlider-thumb": {
                  width: 12,
                  height: 12,
                },
                "& .MuiSlider-track": {
                  height: 6,
                },
                "& .MuiSlider-rail": {
                  height: 6,
                },
              }}
            />

            <div className="grid grid-cols-2 gap-6 justify-between ">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {value[0]}
              </Box>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {value[1]}
              </Box>
            </div>
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

      <div className=" mt-10">
        <button
          onClick={handleClickFilter}
          className="bg-yellow-500 text-white rounded p-2  w-full"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default Filter;
