import React, { useState } from "react";
import RevenueChart from "./RevenueChart";
import ProductChart from "./ProductChart";
import UserChart from "./UserChart";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState("revenue");

  const renderContent = () => {
    switch (activeTab) {
      case "revenue":
        return <RevenueChart />;
      case "orders":
        return <ProductChart />;
      case "users":
        return <UserChart />;
      default:
        return null;
    }
  };

  const tabStyles = {
    base: "px-6 py-3 font-semibold transition-all duration-300 focus:outline-none",
    active: "text-indigo-600 border-b-2 border-indigo-600",
    inactive: "text-gray-600 hover:text-indigo-600"
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          className={`${tabStyles.base} ${
            activeTab === "revenue" ? tabStyles.active : tabStyles.inactive
          }`}
          onClick={() => setActiveTab("revenue")}
        >
          Thống kê doanh thu
        </button>
        <button
          className={`${tabStyles.base} ${
            activeTab === "orders" ? tabStyles.active : tabStyles.inactive
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Thống kê sản phẩm
        </button>
        <button
          className={`${tabStyles.base} ${
            activeTab === "users" ? tabStyles.active : tabStyles.inactive
          }`}
          onClick={() => setActiveTab("users")}
        >
          Thống kê người dùng
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Statistics;
