import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";
import { Table } from "antd";

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [detailedData, setDetailedData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetchWithAuth(summaryApi.getAllOrder.url, {
          method: summaryApi.getAllOrder.method,
        });
        const result = await response.json();
        if (result.respCode === "000") {
          const processedData = result.data.map(order => ({
            orderId: order.orderId,
            orderDate: new Date(order.orderDate),
            revenue: order.total,
            orderStatus: order.orderStatus,
            paymentMethod: order.paymentMethod,
            shippingInfo: `Tên người nhận: ${order.shippingAddress.receiverName}\nSố điện thoại: ${order.shippingAddress.receiverPhone}\nĐịa chỉ: ${order.shippingAddress.location}`,
          }));
          setData(processedData);
          setDetailedData(processedData);
          aggregateData(processedData, timeFrame);
        } else {
          console.error("Failed to fetch revenue data");
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, [timeFrame]);

  const aggregateData = (data, timeFrame) => {
    const aggregated = data.reduce((acc, order) => {
      const key = order.orderDate.toLocaleDateString("vi-VN", {
        day: timeFrame === "day" ? "2-digit" : undefined,
        month: "2-digit",
        year: "numeric",
      });
      if (!acc[key]) {
        acc[key] = { name: key, doanhThu: 0, details: [] };
      }
      acc[key].doanhThu += order.revenue;
      acc[key].details.push(order);
      return acc;
    }, {});

    const aggregatedArray = Object.values(aggregated);
    setAggregatedData(aggregatedArray);
  };

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      const clickedData = data.activePayload[0].payload.details;
      setDetailedData(clickedData);
    }
  };

  const handleRowClick = (record) => {
    setDetailedData(record.details);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const aggregatedColumns = [
    {
      title: "Thời gian",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Doanh thu",
      dataIndex: "doanhThu",
      key: "doanhThu",
      render: (value) => formatCurrency(value),
    },
  ];

  const detailedColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => date.toLocaleString("vi-VN"),
    },
    {
      title: "Thông tin đặt hàng",
      dataIndex: "shippingInfo",
      key: "shippingInfo",
      render: (text) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Loại thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Tổng tiền",
      dataIndex: "revenue",
      key: "revenue",
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            timeFrame === "day" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeFrame("day")}
        >
          Theo Ngày
        </button>
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            timeFrame === "month" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeFrame("month")}
        >
          Theo Tháng
        </button>
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            timeFrame === "year" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeFrame("year")}
        >
          Theo Năm
        </button>
      </div>
      <div className="flex space-x-8 mt-4">
        <LineChart
          width={800}
          height={350}
          data={aggregatedData}
          className="mx-auto"
          onClick={handleChartClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend />
          <Line type="monotone" dataKey="doanhThu" name="Doanh thu" stroke="#8884d8" />
        </LineChart>
        <Table
          dataSource={aggregatedData}
          columns={aggregatedColumns}
          pagination={false}
          rowKey="name"
          className="w-1/3"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
      <Table
        dataSource={detailedData}
        columns={detailedColumns}
        pagination={{ pageSize: 5 }}
        rowKey="orderId"
        className="w-full"
      />
    </div>
  );
};

export default RevenueChart;
