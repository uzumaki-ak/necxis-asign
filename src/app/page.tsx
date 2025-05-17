import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Link href="/dashboard">
        <h1 className="text-5xl hover:text-blue-500 hover:underline cursor-pointer">
          Go to the dashboard
        </h1>
        <FaArrowRight className="mt-4 text-3xl text-gray-600 hover:text-blue-500" />
      </Link>
    </div>
  );
};

export default Home;
