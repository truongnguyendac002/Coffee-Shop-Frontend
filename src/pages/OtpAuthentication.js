import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";

import summaryApi from "../common";
import { toast } from "react-toastify";

import { emailState } from "../states";
import { useRecoilValue } from "recoil";

function OtpAuthentication() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const email = useRecoilValue(emailState);
  console.log(email);

  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const openEmailApp = () => {
    window.open((window.location.href = "mailto:"));
  };

  // Function to verify OTP
  const handleOtpAuthentication = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("Entered OTP:", otpValue);
    console.log("hi")
    // Add your OTP verification logic here
    console.log("hello", summaryApi.verifyOtp.url + `${otpValue}/` + email);
    try {
      const otpResponse = await fetch(
        summaryApi.verifyOtp.url + `${otpValue}/`+email,
        {
          method: summaryApi.verifyOtp.method,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const otpResult = await otpResponse.json();
      if (otpResult.respCode === "000") {
        toast.success(otpResult.respDesc);
        navigate("/change-password");
        console.log("oke otp");
      } else {
        toast.error(otpResult.respDesc);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="p-5 bg-gray-150 rounded-xl ">
            <CiMail />
          </div>
          <h2 className="text-2xl font-bold mb-4">verify OTP</h2>
          <p className="text-gray-600 mb-6 max-w-[80%]">
            Enter the otp code that has been sent to your email.
          </p>
        </div>

        <form onSubmit={handleOtpAuthentication} className="space-y-6 ">
          <div className="flex justify-center space-x-4 my-6">
            {otp.map((_, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                maxLength="1"
                className="w-12 h-12 text-center border-2 rounded-md text-lg focus:outline-none focus:border-indigo-600"
              />
            ))}
          </div>

          <button
            type="submit"
           
            className="w-full py-2 px-4 mb-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            VERIFY OTP
          </button>
        </form>

        <button
          onClick={openEmailApp}
          className=" mt-5 w-full py-2 px-4 bg-gray-200 text-indigo-600 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none"
        >
          Open Mail App
        </button>

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

export default OtpAuthentication;