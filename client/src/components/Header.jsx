import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-white shadow w-full h-16 flex justify-between items-center">
      <div className="ml-4">
        <Link to={"/"}>
          <img className="h-16" src="" alt="Logo" />
        </Link>
      </div>
      <div className="flex mr-4 gap-2">
        <Link
          to={"/signup"}
          type="button"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          SignUp
        </Link>
        <Link
          to={"/signin"}
          type="button"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Header;
