import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import summaryApi from "../../common";

const Filter = ({ closeFilter , onFilter  }) => {
  const [brands, setBrands] = useState([]);
  const [selectBrand, setSelectBrand] = useState("");
  const [values, setValues] = useState([100, 500]);
  const [products, setProducts] = useState([]);
  const STEP = 100;
  const MIN = 100;
  const MAX = 900;

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
      const inPriceRange = product.price >= values[0] && product.price <= values[1];
      const matchesBrand = selectBrand ? product.brand.name === selectBrand : true;
      return inPriceRange && matchesBrand;
    });

    onFilter(filtered); 
    closeFilter(); 
  };

  return (
    <div className="relative p-6 w-full bg-white rounded-lg shadow-xl">
      <div className="absolute top-0 right-6 w-4 h-4 rounded-sm bg-white rotate-45 transform -translate-y-1/2"></div>
      <h2 className="text-xl font-semibold mb-4">Filter</h2>
      <div className="w-full grid grid-cols-3 justify-between items-start gap-x-14">
        <div>
          <p className="text-xl font-semibold mb-4">Mức giá</p>
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => {
              const { key, ...otherProps } = props;
              return (
                <div
                  {...otherProps}
                  key={key}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    background: getTrackBackground({
                      values,
                      colors: ["#ccc", "#4caf50", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    boxSizing: "border-box",
                  }}
                >
                  {children}
                </div>
              );
            }}
            renderThumb={({ index, props }) => {
              const { key, ...otherProps } = props;
              return (
                <div
                  {...otherProps}
                  key={key}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    borderRadius: "12px",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      height: "16px",
                      width: "5px",
                      backgroundColor: "#4caf50",
                    }}
                  />
                </div>
              );
            }}
          />

          <div className="flex justify-between gap-x-28 mt-4">
            <div className="w-15 text-center">{values[0].toLocaleString()}</div>
            <div className="w-15 text-center">{values[1].toLocaleString()}</div>
          </div>
        </div>

        {/* Lọc theo thương hiệu */}
        <div className="col-span-2">
          <p className="text-xl font-semibold mb-4">Brand</p>
          <div className="grid grid-cols-3 gap-3 mt-2">
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

      {/* Nút Cancel và Show Result */}
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
