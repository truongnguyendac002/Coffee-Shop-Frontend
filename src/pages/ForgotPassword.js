import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email gửi yêu cầu reset: ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <div className="p-4 rounded-xl bg-gray-100"> 
          <IoKeyOutline />
          </div>
          <h2 className="text-2xl font-bold">Forgot password?</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        <div className="flex justify-center mt-4">
          <span className="h-2 w-2 bg-gray-400 rounded-full mx-1"></span>
          <span className="h-2 w-2 bg-purple-600 rounded-full mx-1"></span>
          <span className="h-2 w-2 bg-gray-400 rounded-full mx-1"></span>
          <span className="h-2 w-2 bg-gray-400 rounded-full mx-1"></span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
