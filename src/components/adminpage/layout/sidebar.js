import React from "react";
import {
  MdTimeline,
  MdPermIdentity,
  MdStore,
  MdBarChart,
  MdMailOutline,
  MdDynamicFeed,
  MdChatBubbleOutline,
  MdWorkOutline,
  MdReport,
} from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex-1  bg-white shadow-md h-[calc(100vh-60px)] shadow-gray-400 sticky ">
      <div className="p-5 text-gray-600">

        {/* Quick Menu */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-400 ">Dashboard</h3>
          <ul className="list-none p-1">
            <Link to="users" className="no-underline">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <MdPermIdentity className="mr-2 text-lg" />
                Users
              </li>
            </Link>

            <Link to="products" className="no-underline">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <MdStore className="mr-2 text-lg" />
                Products
              </li>
            </Link>

            <Link to="brands" className="no-underline">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <MdStore className="mr-2 text-lg" />
                Nhãn hàng
              </li>
            </Link>

            <Link to="categories" className="no-underline">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <MdStore className="mr-2 text-lg" />
                Danh mục
              </li>
            </Link>

            <Link to="orders">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <LiaClipboardListSolid className="mr-2 text-lg" />
                Đơn hàng
              </li>
            </Link>
            <Link to="statistics" className="no-underline">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <MdBarChart className="mr-2 text-lg" />
                Thống kê
              </li>
            </Link>
          </ul>
        </div>

        {/* Notifications */}
        <div className="mb-3">
          <h3 className="text-sm text-gray-400 ">Notifications</h3>
          <ul className="list-none p-1">
            <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
              <MdMailOutline className="mr-2 text-lg" />
              Mail
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
              <MdDynamicFeed className="mr-2 text-lg" />
              Feedback
            </li>
            <Link to="messages">
              <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <MdChatBubbleOutline className="mr-2 text-lg" />
                Messages
              </li>
            </Link>
          </ul>
        </div>

        {/* Staff */}
        <div>
          <h3 className="text-sm text-gray-400 ">Staff</h3>
          <ul className="list-none p-1">
            <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
              <MdWorkOutline className="mr-2 text-lg" />
              Manage
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
              <MdTimeline className="mr-2 text-lg" />
              Analytics
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-indigo-100 cursor-pointer">
              <MdReport className="mr-2 text-lg" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
