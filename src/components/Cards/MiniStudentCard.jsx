import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { calculateAge } from "../../lib/utils";

const MiniStudentCard = () => {
  const dispatch = useDispatch();
  const student = useSelector((store) => store.studentReducer.Details);
  const studentId = useParams();
  console.log("student and id in card", student, studentId);
  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT", payload: studentId });
  }, [dispatch, studentId]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const sheetStyle = {
    backgroundColor: "white", // or any color of your choice
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // to add some shadow
  };

  return (
    // <article
    //   style={{
    //     position: "absolute",
    //     top: "100px",
    //     left: "10px",
    //     width: "300px",
    //     height: "auto",
    //   }}
    //   className="background-light900_dark200 light-border rounded-2xl border p-4 shadow-lg flex flex-col items-center"
    // >
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "450px", // Set a maximum width
        margin: "0 auto", // Center in the parent component
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Add shadow
        backgroundColor: "#fff", // Background color
        padding: "1rem", // Padding around content
        borderRadius: "8px", // Rounded corners
      }}
      className="background-light900_dark200 light-border rounded-2xl border p-4 shadow-lg"
    >
      {" "}
      <h2 className="h2-bold text-dark100_light900 text-center mb-4">{`${student.first_name} ${student.last_name}`}</h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <img
          src={student.picture}
          alt={`${student.first_name} ${student.last_name}`}
          width={140}
          height={140}
          className="rounded-full object-cover mr-4 mb-4 md:mb-0"
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
          <p className="body-regular text-dark500_light500 text-lg">
            Grade: {student.grade}
          </p>
          {/* <p className="body-regular text-dark500_light500">
            School: {student.school}
          </p> */}
          <p className="body-regular text-dark500_light500 text-lg">
            Gender: {student.gender}
          </p>
          <p className="body-regular text-dark500_light500 text-lg">
            Date of Birth: {new Date(student.dob).toLocaleDateString()}
          </p>
          <p className="body-regular text-dark500_light500 text-lg">
            Age: {calculateAge(student.dob)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MiniStudentCard;
