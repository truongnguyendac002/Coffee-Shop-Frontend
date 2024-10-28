import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img_login from "../assets/img/img-login.png";
import Logo from "../components/Logo";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import summaryApi from "../common";

import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {
        const signUpResponse = await fetch(summaryApi.signUP.url, {
          method: summaryApi.signUP.method,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const signUpResult = await signUpResponse.json();

        if (signUpResult.respCode === "000") {
          toast.success("Sign Up  Successfully !"  )
          // auto login 
          const loginResponse =  await fetch (summaryApi.signIn.url , {
            method : summaryApi.signIn.method ,
            body : JSON.stringify({
              email: data.email,
              password: data.password
            }), 
            headers :  { 
              "Content-Type": "application/json",
            },
          })

          const loginResult =await loginResponse.json() 
          if(loginResult.respCode === "000") {
            navigate("/")
            console.log("auto login Successfully")
          }

        } else {
          toast.error(signUpResult.data ,{
            autoClose: 5000,
          } )
        }

      } catch (error) {
        console.log("Error SignUp", error);
      }
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

          <div>
            <h1 className="text-3xl font-bold mt-12 text-center ">Sign Up</h1>

            <p className="mt-3 mb-14 text-gray-400 text-center text-sm">
              Let’s create your account and Shop like a pro and save money.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                required
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleOnchange}
                type="email"
                className="text-lg mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className=" relative flex items-center justify-center ">
                <input
                  required
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
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

            {/* confirmPassword */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className=" relative flex items-center justify-center ">
                <input
                  required
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnchange}
                  type={showConfirmPassword ? "text" : "password"}
                  className=" mt-1 block  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
                <div
                  className="absolute right-4 top-4 cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((pre) => !pre)}
                >
                  <span>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            {/* button submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-black font-semibold rounded-md shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Sign Up
            </button>
          </form>

          {/* don't have an account */}
          <div className="flex items-center mt-5 space-x-3 justify-center">
            <span className=" text-center text-gray-500">
              You have an account yet?{" "}
            </span>
            <Link to="/login">
              <span className="text-blue-600 hover:underline">Sign In</span>.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
