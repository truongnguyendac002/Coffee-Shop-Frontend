import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InPutForm = ({
  label,
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  error = "",
  required = false,
  showEye =false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col space-y-1">
      {label && (
        <label className="mb-1 text-sm font-semibold text-gray-700 ">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none 
                ${
                  error
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300"
                }`}
        />
        {
          showEye && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3  top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>)
        }
      </div>

      {error && (
        <div className="flex items-center mt-1 text-sm text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.366-.446.977-.51 1.457-.145l.09.074 5.992 6a1 1 0 01.01 1.32l-.083.094-5.992 6a1 1 0 01-1.446-1.32l.083-.094L12.584 10 8.348 5.633a1 1 0 01-.091-1.32l.083-.094z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default InPutForm;
