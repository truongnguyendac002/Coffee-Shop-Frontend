import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";

import { MdOutlineShoppingCart } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    dispatch(clearUser());

    navigate("/");
    toast.success("Logout Successfully!");
  };

  const user = useSelector((state) => state?.user?.user);
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

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
         
          <div className="hidden md:flex space-x-5">
            <div className="relative">
              <button className="text-gray-700 dark:text-white hover:underline">
                Departments
              </button>
            </div>
            <div className="relative">
              <button className="text-gray-700 dark:text-white hover:underline">
                Grocery
              </button>
            </div>
            <div className="relative">
              <button className="text-gray-700 dark:text-white hover:underline">
                Beauty
              </button>
            </div>
          </div>
        </div>
        {/* search */}
        <div className="bg-white hidden w-full max-w-xs lg:flex items-center justify-between rounded-full border pl-2 focus-within:shadow">
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
          <Link to="/cart">
            <div className="relative cursor-pointer text-2xl">
              <span>
                <MdOutlineShoppingCart />
              </span>
              <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                <p className="text-sm">0</p>
              </div>
            </div>
          </Link>
          {user?.id && (
            <div className="relative flex cursor-pointer justify-center text-3xl">
              {user?.profile_img ? (
                <img
                  src={user?.profile_img}
                  alt="Avatar User"
                  className="w-10 rounded-full"
                />
              ) : (
                <PiUserCircle />
              )}
            </div>
          )}
          {/* sign in, sign up, and sign out */}
          {!user?.id ? (
            <>
              <div>
                <Link to="/login">
                  <button className="rounded-full bg-teal-500 px-5 py-1 text-white text-lg hover:bg-teal-600">
                    Sign In
                  </button>
                </Link>
              </div>

              <div>
                <Link to="/sign-up">
                  <button className="rounded-full bg-teal-500 px-5 py-1 text-white text-lg hover:bg-teal-600">
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-teal-500 px-5 py-1 text-white text-lg hover:bg-teal-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;