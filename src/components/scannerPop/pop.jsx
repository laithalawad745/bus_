import "./pop.css";
// import Imagesman from "../../assets/images/6769264_60111.jpg"
// import Imagesweman from "../../assets/images/mother.png"

import { useState } from "react";
import Image from "next/image";

function Pop({ scanner, setShowpop, studentResponse, axios }) {
  const handleSave = async () => {
    scanner.current.resume();
    setShowpop(false);
  };

  const handleCansle = () => {
    scanner.current.resume();
    setShowpop(false);
  };

  return (
<div className="img_liner absolute left-[5%] top-[40%] h-[40%] w-[90%] rounded-lg bg-blue-600/30 backdrop-blur-md z-99999">
<div className="flex w-full items-center justify-between p-8 flex-col-reverse sm:flex-row gap-10 text-white">

        <div className="text-side12-color flex flex-col items-end">
          <h1 className="text-side13-color text-xl">
            {studentResponse?.major}
          </h1>
        </div>
        <div>
          <h2 className="text-side12-color text-3xl">
            {studentResponse?.studentName}
          </h2>
        </div>

      </div>

      <div className="absolute bottom-5 left-[40%] sm:bottom-[20%] sm:left-[43%]">
        <button
          variant="contained"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          onClick={handleCansle}
        >
          Done{" "}
        </button>
      </div>
    </div>
  );
}

export default Pop;
