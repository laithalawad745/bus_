"use client";
import React, { useState } from "react";
import axiosInstance from "../shared/axiosinstance";
import axios from "axios";

const Login = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState(""); 
  const [verificationCode, setVerificationCode] = useState(""); 
  const [token, setToken] = useState(""); 
  if(localStorage.getItem("role") == "admin"){
    document.location.href = "/";
  }else if(localStorage.getItem("role") == "code-sent"){
    setIsCodeSent(true)
  }
  const handleSignIn = () => {
    axiosInstance.post("auth/send-code", { email })
      .then((response) => {
        localStorage.setItem("email", email); 
        localStorage.setItem("token",response.data.token)
        setToken(response.data.token)
        localStorage.setItem("role",response.data.role)
        localStorage.setItem("expire",response.data.expireDate)
        setIsCodeSent(true); 
      })
      .catch((error) => {
        console.log("Sign In Error:", error);
      });
  };

  const handleSubmitCode = () => {
    axios.post("https://mmo2zebussystem-c5c63f16b7b0.herokuapp.com/auth/verify-code", {  code: verificationCode }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Code Verification Response:", response.data);
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)
        localStorage.setItem("expire",response.data.expireDate)
        document.location.href = "/";
      })
      .catch((error) => {
        console.log("Code Verification Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCodeSent) {
      handleSubmitCode(); 
    } else {
      handleSignIn(); 
    }
  };

  return (
    <div className="min-h-dvh bg-gray-900 flex items-center justify-center ">
      <section className="w-full flex justify-center items-center">
        <div className=" w-11/12 flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md lg:max-w-lg xl:max-w-xl md:h-full lg:py-0">
          <div className="w-full rounded-lg shadow border bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                {isCodeSent ? "Enter The Verification Code" : "Sign in with your email"}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {isCodeSent ? (
                  <div>
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-white">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter the verification code"
                      required=""
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {isCodeSent ? "Submit Code" : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
    
};

export default Login;
