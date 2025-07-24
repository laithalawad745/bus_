'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export const metadata: Metadata = {
//   title:
//     "Qpu Admin",
//   description: "Dashboard Admin",
// };

export default function Home() {
  if(localStorage.getItem("role") !== "admin"){
    document.location.href="/login";
  }
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
