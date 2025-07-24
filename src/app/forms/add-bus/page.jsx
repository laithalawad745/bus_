"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import axiosInstance from "@/app/shared/axiosinstance";

const AddBus = () => {
  const [departureTime, setDepartureTime] = useState("");
  const [numberOfChairs, setNumberOfChairs] = useState("");

  const handleSubmit = () => {
    axiosInstance.post("bus", {
      endTime: departureTime+":00",
      capacity: numberOfChairs,
    })
    .then((response) => {
      console.log("Bus data submitted successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error submitting bus data:", error);
    });
  };

  return (
    <div className="h-dvh">
      <DefaultLayout>
        <Breadcrumb pageName="Add A Trip" />
        <h1 className="text-title-md2 font-semibold text-black dark:text-white mb-9 mt-4 text-center">
          Enter A Bus Information
        </h1>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Enter your departure time
          </label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            placeholder="Enter The Time"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="pt-10 sm:pt-20">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Enter the number of chairs
          </label>
          <input
            type="number"
            value={numberOfChairs}
            onChange={(e) => setNumberOfChairs(e.target.value)}
            placeholder="Enter The Chairs"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <button
          className="mt-12 relative right-[-25%] w-1/2 rounded bg-primary px-6 py-2 sm:py-4 font-medium text-gray hover:bg-opacity-90"
          type="button"
          onClick={handleSubmit} 
        >
          Submit
        </button>
      </DefaultLayout>
    </div>
  );
};

export default AddBus;
