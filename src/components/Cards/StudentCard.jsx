import React from "react";
import { useEffect, useState } from "react";
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

const StudentCard = () => {
  const dispatch = useDispatch();
  const student = useSelector((store) => store.studentReducer.Details);
  // const studentId = useParams();
  const { id: studentId } = useParams();
  

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT", payload: studentId });
  }, [dispatch, studentId]);

  // State to hold form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    grade: "",
    school: "",
    gender: "",
    dob: "",
    address: "",
    county: "",
    zip_code: "",
    state: "",
    barton_c_date: "",
    barton_c: "",
    on_site: "",
    start_date: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        grade: student.grade || "",
        school: student.school || "",
        gender: student.gender || "",
        dob: student.dob ? student.dob.split("T")[0] : "",
        address: student.address || "",
        county: student.county || "",
        zip_code: student.zip_code || "",
        state: student.state || "",
        barton_c_date: student.barton_c_date
          ? student.barton_c_date.split("T")[0]
          : "",
        barton_c: student.barton_c || "",
        on_site: student.on_site || "",
        start_date: student.start_date ? student.start_date.split("T")[0] : "",
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.id, e.target.value);
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_STUDENT",
      payload: { id: studentId, ...formData },
    });
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const sheetStyle = {
    backgroundColor: "white", 
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // to add some shadow
    maxHeight: "80vh", // Example: 80% of the viewport height
    overflowY: "auto", // Enables vertical scrolling
  };

  return (
    <article className="background-light900_dark200 light-border rounded-2xl border p-8 shadow-lg relative flex flex-col items-center">
      <h2 className="h2-bold text-dark100_light900 text-center mb-4">{`${student.first_name} ${student.last_name}`}</h2>

      <div className="flex flex-col w-full md:flex-row items-start md:items-center justify-between">
        <img
          src={student.picture}
          alt={`${student.first_name} ${student.last_name}`}
          width={140}
          height={140}
          className="rounded-full object-cover mr-4 mb-4 md:mb-0"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="absolute top-2 right-2 text-xs px-2 py-1"
            >
              Edit Student
            </Button>
          </SheetTrigger>
          <SheetContent side="top" style={sheetStyle}>
            <SheetHeader>
              <SheetTitle>Edit Student</SheetTitle>
              <SheetDescription>
                Make changes to the student's profile here.
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />

                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />

                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  type="number"
                  value={formData.grade}
                  onChange={handleInputChange}
                />

                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={handleInputChange}
                />

                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                />

                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />

                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />

                <Label htmlFor="county">County</Label>
                <Input
                  id="county"
                  value={formData.county}
                  onChange={handleInputChange}
                />

                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zip_code"
                  type="number"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                />
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />

                <Label htmlFor="pretestDate">Barton C Date</Label>
                <Input
                  id="barton_c_date"
                  type="date"
                  value={formData.barton_c_date}
                  onChange={handleInputChange}
                />

                <Label htmlFor="pretestPassed">Barton C</Label>
                <select
                  id="barton_c"
                  value={formData.barton_c}
                  onChange={handleInputChange}
                >
                  <option value="true">Foundations</option>
                  <option value="false">Barton</option>
                </select>

                <Label htmlFor="onSite">On Site</Label>
                <select
                  id="on_site"
                  value={formData.on_site}
                  onChange={handleInputChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handleSubmit} type="submit">
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
          <p className="body-regular text-dark500_light500">
            Grade: {student.grade}
          </p>
          <p className="body-regular text-dark500_light500">
            School: {student.school}
          </p>
          <p className="body-regular text-dark500_light500">
            Gender: {student.gender}
          </p>
          <p className="body-regular text-dark500_light500">
            Date of Birth: {new Date(student.dob).toLocaleDateString()}
          </p>
          <p className="body-regular text-dark500_light500">
            Address: {student.address}
          </p>
          <p className="body-regular text-dark500_light500">
            County: {student.county}
          </p>
          <p className="body-regular text-dark500_light500">
            Zip Code: {student.zip_code}
          </p>
          <p className="body-regular text-dark500_light500">
            State: {student.state}
          </p>
          <p className="body-regular text-dark500_light500">
            Barton C Date: {new Date(student.barton_c_date).toLocaleDateString()}
          </p>
          <p className="body-regular text-dark500_light500">
            Barton C: {student.barton_c ? "Foundations" : "Barton"}
          </p>
          <p className="body-regular text-dark500_light500">
            On Site: {student.on_site ? "Yes" : "No"}
          </p>
          <p className="body-regular text-dark500_light500">
            Start Date: {new Date(student.start_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </article>
  );
};

export default StudentCard;
