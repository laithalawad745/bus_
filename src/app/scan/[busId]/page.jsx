"use client";
import { useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axiosInstance from "@/app/shared/axiosinstance";
import { useParams } from "next/navigation";
import Pop from "@/components/scannerPop/pop";
import Scanner from "../../../components/Scanner/scanner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Scan = () => {
  const scanner = useRef(null);
  const { busId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [student, setStudent] = useState({});

  function success(result) {
    scanner.current.pause();
    console.log(result);
    axiosInstance
      .post(`validate?busId=${busId}&studentId=${result}`)
      .then((response) => {
        setStudent(response.data);
        setShowPopup(true);
      })
      .catch((error) => {
        setTimeout(() => {
          scanner.current.resume();
        }, 2000);
        if (error.response.data.title === "One or more validation errors occurred.") {
          toast.error(' Invalid QR', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (error.response.status === 404) {
          toast.error('الرحلة ليست موجودة', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(' Please, try again later....', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  }

  return (
    <div className="h-dvh">
      <DefaultLayout>
        <ToastContainer />
        <Breadcrumb pageName="Scanner The QR" />
        <div className="mx-auto max-w-md p-4">
          <h1 className="mb-4 text-center text-2xl font-bold">ماسح QR Code</h1>

          <div className="add-page pt-20">
            <div className="main-content">
              <Scanner success={success} scanner={scanner} />
              {showPopup && (
                <Pop
                  axios={axios}
                  scanner={scanner}
                  setShowpop={setShowPopup}
                  studentResponse={student}
                />
              )}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Scan;
