import React from "react";
import Header from "../components/Header.jsx";

const Home = () => {
  return (
    <div className="bg-slate-300 h-full grid-1">
      <Header />
      <div className="flex flex-col md:flex-row justify-between ml-2">
        <div>
          <div className="flex justify-start ml-4 h-20 mt-4">
            <img src="" alt="Main Image" />
          </div>
          <div className="flex flex-col justify-center mt-16 gap-4">
            <h1 className="font-bold text-3xl md:text-6xl">
              India's Most-loved Payments App
            </h1>
            <p className="font-medium text-xl md:text-2xl">
              Recharge & pay bills, book flights & movie tickets, open a savings
              account, invest in stocks & mutual funds, and do a lot more.
            </p>
          </div>
        </div>
        <div className="m-4">
          <img className="h-auto w-auto" src="../1706796536129.avif" alt="" />
        </div>
      </div>
      <footer className="bg-gray-600 text-white text-center p-4 mt-8">
        <p>© {new Date().getFullYear()} Paytm. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
