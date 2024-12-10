import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img_login from "../assets/img/img-login.png";
import Logo from "../components/layout/Logo";

import summaryApi from "../common";
import { toast } from "react-toastify";
import { message } from "antd";

import Cookies from "js-cookie";
import Context from "../context";
import EmailInput from "../components/validateInputForm/EmailInput";
import PasswordInput from "../components/validateInputForm/PasswordInput";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { fetchUserDetails } = useContext(Context);
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

  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const loginResult = await loginResponse.json();

      if (loginResult.respCode === "000") {
        navigate("/");
        message.success("Login Successfully !");

        const { accessToken, refreshToken } = loginResult.data;
        Cookies.set("token", accessToken);
        Cookies.set("refreshToken", refreshToken);
        fetchUserDetails();
      } else {
        toast.error(loginResult.data);
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
            <EmailInput onEmailChange={handleOnchange} />

            <PasswordInput
              label={"Password"}
              placeholder={"Enter password"}
              name={"password"}
              onChange={handleOnchange}
            />

            <div className="text-right">
              <div>
                <Link to="/forgot-password">
                  <span className="text-sm text-blue-600 font-medium hover:underline">
                    Forgot Password
                  </span>
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-300 text-black font-semibold rounded-md shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick= {googleLogin}
              className="mt-2 w-full py-2 px-4 bg-gray-200 text-black font-semibold rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in with Gmail
            </button>
          </form>

          <div className="flex items-center mt-6 space-x-3 justify-center">
            <span className=" text-center text-gray-500">
              Don’t have an account yet?
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
