import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex-between background-light900_dark200 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 bg-primary-500">
      <Link to="/home" className="flex items-center gap-1">
        <img
          src="/assets/images/site-logo.png"
          width={180}
          height={180}
          alt="Haley's Hope Logo"
        />
      </Link>
      <div className="flex gap-4">
        {!user.id && (
          <Link className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg mr-4" to="/login">
            Login / Register
          </Link>
        )}

        {user.id && (
          <>
            <Link className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg mr-4" to="/students">
              Students
            </Link>

            <Link className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg mr-4" to="/info">
              Info Page
            </Link>

            {/* Adjust LogOutButton styling as needed */}
            <LogOutButton className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg" />
          </>
        )}

        <Link className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
