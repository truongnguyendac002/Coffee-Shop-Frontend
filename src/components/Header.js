import React from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Header = () => {
  return (
    <header className="bg-gray-150 dark:bg-gray-900 px-10 py-7">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-32">
          {/* logo  */}
          <div className="">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* nav */}
          {/* Dropdowns */}
          <div className="hidden md:flex space-x-5">
            <div className="relative">
              <button className="text-gray-700 dark:text-white hover:underline">
                Departments
              </button>
              {/* Dropdown content for Departments */}
            </div>
            <div className="relative">
              <button className="text-gray-700 dark:text-white hover:underline">
                Grocery
              </button>
              {/* Dropdown content for Grocery */}
            </div>
            <div className="relative">
              <button className="text-gray-700 dark:text-white hover:underline">
                Beauty
              </button>
              {/* Dropdown content for Beauty */}
            </div>
          </div>
        </div>

        <div className=" bg-white hidden w-full max-w-sm lg:flex items-center justify-between rounded-full border pl-2 focus-within:shadow">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none px-4 "
          />
          <div className="flex h-8 min-w-[50px] items-center justify-center rounded-r-full bg-teal-500 text-lg text-white cursor-pointer hover:bg-teal-600">
            <GrSearch />
          </div>
        </div>

        {/* user */}
        <div className="flex items-center space-x-6">
          {/* user icon */}
          <Link to="/cart">
          <div className=" relative cursor-pointer text-2xl ">
            <span>
              <CiShoppingCart />
            </span>
            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-1 text-white">
              <p className="text-sm">0</p>
            </div>
          </div>
          </Link>

          {/*  cart*/}
          <div className="relative flex cursor-pointer justify-center text-3xl">
            <CiUser />
          </div>

          {/* sign in or sign out */}
          <div>
            <Link to="/sign-up">
              <button className="rounded-full bg-teal-500 px-5 py-1 text-white text-lg hover:bg-teal-600">
                Sign Up
              </button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <button className="rounded-full bg-teal-500 px-5 py-1 text-white text-lg hover:bg-teal-600">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
