import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import EmailInput from "../components/EmailInput";
import summaryApi from "../common";
import { toast } from "react-toastify";
import {emailState} from "../states"
import { useRecoilState , useRecoilValue } from "recoil";


function ForgotPassword() {
  const [email, setEmailState] = useRecoilState(emailState);
  const navigate = useNavigate();



  const handleEmailChange = (newEmail) => {
    setEmailState(newEmail);
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(`Email gửi yêu cầu reset: ${email}`);
    // console.log(summaryApi.forgotPassword.url + `${email}`)
    try{
      const forgotPassResponse = await fetch(summaryApi.forgotPassword.url + `${email}` , {
        method: summaryApi.forgotPassword.method , 
        headers: {
          "Content-Type": "application/json",
        },
      })

      const forgotPassResult = await forgotPassResponse.json() ;
      if(forgotPassResult.respCode === "000") {
        toast.success(forgotPassResult.respDesc)
        navigate("/otp-auth")
        setEmailState(email);
        console.log("oke sent email")
      }else {
        toast.error(forgotPassResult.respDesc)
      }

    }catch (error){
      console.log("error" , error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <div className="p-4 rounded-xl bg-gray-100">
            <IoKeyOutline />
          </div>

          <h2 className="text-2xl font-bold">Forgot password?</h2>

          <p className="text-sm text-gray-400 mt-3">
          Please enter your email!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <EmailInput onEmailChange={handleEmailChange} />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 "
          >
            Sent Email
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

export default ForgotPassword;