import React, { useState } from "react";
import PasswordInput from "../components/validateInputForm/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { VscLock } from "react-icons/vsc";
import { toast } from "react-toastify";
import summaryApi from "../common";

import {  useSelector } from "react-redux";

function ChangePassword() {

  const email = useSelector((state) => state.forgotPassword.email);
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    repeatPassword: "",
  });

  const handleOnchange = (dataPass) => {
    const { name, value } = dataPass;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pass", data.password, "confirmPass", data.repeatPassword);
    console.log("data", data);
    if (data.password === data.repeatPassword) {
      try {
        const changePasswordResponse = await fetch(
          summaryApi.changePassword.url + email,
          {
            method: summaryApi.changePassword.method,
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const changePassResult = await changePasswordResponse.json();

        if (changePassResult.respCode === "000") {
          toast.success(changePassResult.respDesc);
          navigate("/login");
          console.log("oke change Password ");
        }
      } catch (error) {
        toast.error(error);
        console.log("Error", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <div className="p-5 bg-gray-150 rounded-xl ">
            <VscLock />
          </div>
          <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
          <p className="mb-8 text-center w-full max-w-[80%] text-gray-400 ">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            label={"Password"}
            placeholder={"Enter password"}
            name={"password"}
            onChange={handleOnchange}
          />

          <PasswordInput
            label={"Confirm Password"}
            placeholder={"Enter confirmPassword"}
            name={"repeatPassword"}
            onChange={handleOnchange}
          />

          <ul className="mb-6 text-sm text-gray-500 list-disc list-inside">
            <li className="marker:text-red-500 ">
              Must be at least 8 characters
            </li>
            <li className="marker:text-red-500 ">
              Must contain one special character
            </li>
          </ul>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-500"
          >
            Reset password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login">
            <p className="text-indigo-600 hover:underline mt-2">
              ← Back to log in
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
