import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudentList from "../StudentList/StudentList";
import { Button } from "../ui/button";

function UserPage() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="h1-bold text-dark100_light900 text-xl md:text-2xl">
            All Students
          </h1>
          <Link to="/add-student">
            <Button className="bg-primary-100 min-h-[46px] px-4 py-3 !text-light-900">
              Add New Student
            </Button>
          </Link>
        </div>

        {/* <div className="flex justify-between gap-5 mb-6 max-sm:flex-col sm:items-center">
          Add Filters here 
        </div> */}

        <StudentList />
      </div>
    </>
  );
}

export default UserPage;

{
  /* <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */
}
