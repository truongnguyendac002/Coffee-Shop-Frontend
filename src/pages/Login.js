import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img_login from "../assets/img/img-login.png";
import Logo from "../components/Logo";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import summaryApi from "../common";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  // console.log('data login' , data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = dataResponse.headers.get("Content-Type");
      let response;

      if (contentType && contentType.includes("application/json")) {
        response = await dataResponse.json();
      } else {
        const responseText = await dataResponse.text();
        console.log("Response:", responseText);

        if (responseText === "Login Success ") {
          navigate("/");
          console.log("Login oke");
        } else {
          console.log("Error Login:", responseText);
        }
        return; 
      }

      if (response) {
        navigate("/");
      } else {
        console.log("Error Login ");
      }
    } catch (error) {
      console.log("error Login", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-gray-100 md:w-1/2 flex items-center justify-center p-8">
        <div className="w-96 h-80 ">
          <img src={img_login} alt="img-Login" className="" />
          <p className="text-lg font-sans mb-4 mt-12 text-center">
            The best of luxury brand values, high quality products, and
            innovative services.
          </p>
        </div>
      </div>

      <div className="bg-white md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center  ">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <h1 className="text-3xl font-bold mt-12 text-center ">
            Hello Again!
          </h1>

          <p className="mt-3 mb-14 text-gray-400 text-center text-sm">
            Welcome back to sign in. As a returning customer, you have access to
            your previously saved all information.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                required
                placeholder="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleOnchange}
                className="text-lg mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Password
              </label>

              <div className=" relative flex items-center justify-center ">
                <input
                  required
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className=" mt-1 block  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
                <div
                  className="absolute right-4 top-4 cursor-pointer text-xl"
                  onClick={() => setShowPassword((pre) => !pre)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="w-6 form-checkbox text-yellow-600 "
                />
                <span className="ml-2 font-medium text-gray-400 ">
                  Stay signed in
                </span>
              </label>
              {/* forgot password */}
              <div>
                <Link to="/forgot-password">
                  <p className="text-sm text-blue-600 font-medium hover:underline">
                    Recovery Password
                  </p>
                </Link>
              </div>
            </div>
            {/* button submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-300 text-black font-semibold rounded-md shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Sign in
            </button>
            {/* login with google */}
            <button
              type="button"
              className="mt-2 w-full py-2 px-4 bg-gray-200 text-black font-semibold rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in with Gmail
            </button>
          </form>

          {/* don't have an account */}
          <div className="flex items-center mt-6 space-x-3 justify-center">
            <span className=" text-center text-gray-500">
              Don’t have an account yet?{" "}
            </span>
            <Link to="/sign-up">
              <span className="text-blue-600 hover:underline">Sign Up</span>.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
