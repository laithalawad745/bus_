"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import axiosInstance from "@/app/shared/axiosinstance";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("male");
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [isOptionSelected2, setIsOptionSelected2] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const changeTextColor2 = () => {
    setIsOptionSelected2(true);
  };

  const copyToClipboard = () => {
    const text = `ID :   ${id}\nPassword :    ${password}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Done")
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const submit = () => {
    axiosInstance.post("student", {
      name: name,
      phone: phone,
      gender: selectedRadio,
      major: selectedOption2,
      year: selectedOption,
    })
    .then((response) => {
      console.log("Student Added Successfully:", response.data);
      setId(response.data.id);
      setPassword(response.data.password);
    })
    .catch((error) => {
      console.log("Error Adding Student:", error);
    });
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen flex flex-col">
        <Breadcrumb pageName="Add A Student" />

        <h1 className="mb-9 mt-4 pt-4 text-center text-title-md2 font-semibold text-black dark:text-white">
          Enter A Student information
        </h1>
        
        <div className="flex-grow">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <div className="pt-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Enter The Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter The Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            
            <div className="pt-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Enter The Phone
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter The Phone"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Year Selection */}
            <div className="pt-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Select Year
              </label>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-6 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  <option value="" disabled className="text-body dark:text-bodydark">
                    Select Year
                  </option>
                  {[1, 2, 3, 4, 5].map((year) => (
                    <option key={year} value={year} className="text-body dark:text-bodydark">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialty Selection */}
            <div className="pt-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Select Specialty
              </label>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  value={selectedOption2}
                  onChange={(e) => {
                    setSelectedOption2(e.target.value);
                    changeTextColor2();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-6 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected2 ? "text-black dark:text-white" : ""
                  }`}
                >
                  <option value="" disabled className="text-body dark:text-bodydark">
                    Select Specialty
                  </option>
                  {[
                    "dentistry",
                    "pharmacy",
                    "engineering",
                    "business",
                    "adab",
                  ].map((specialty) => (
                    <option
                      key={specialty}
                      value={specialty}
                      className="text-body dark:text-bodydark"
                    >
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="flex justify-around pt-6">
              {["male", "female"].map((gender) => (
                <label
                  key={gender}
                  onClick={() => setSelectedRadio(gender)}
                  className="flex w-[40%] cursor-pointer items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    checked={selectedRadio === gender}
                    onChange={() => setSelectedRadio(gender)}
                    type="radio"
                    value={gender}
                    name="bordered-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <span className="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Display and Copy ID and Password */}
          <div className="w-full md:w-1/2 mx-auto mt-10 text-center">
            {id && (
              <div className="mb-4">
                <h1>ID: {id}</h1>
            
              </div>
            )}
            {password && (
              <div>
                <h1>Password: {password}</h1>
                <button 
                  onClick={() => copyToClipboard()}
                  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 mt-2"
                >
                  Copy User Name and Password
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-1/2 mx-auto mt-10">
            <button 
              type="button" 
              onClick={submit}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddStudent
