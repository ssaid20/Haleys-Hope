import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import Tests from "../shared/Tests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TestTab from "../shared/TestTab/TestTab";
import AssessmentTab from "../shared/AssessmentTab/AssessmentTab";
import GraphTab from "../shared/GraphTab/GraphTab";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StudentCard from "../Cards/StudentCard";
import CommentsTab from "../shared/CommentsTab/CommentsTab";
import CloudifyUploadForm from "../Cloudinary/CloudinaryUploadForm";
import { useState } from "react";
import CompareTab from "../shared/CompareTab/CompareTab";

function StudentDetails() {
  const dispatch = useDispatch();
  const student = useSelector((store) => store.studentReducer.Details);
  console.log("student", student);
  const studentId = useParams(); // Retrieve the student ID from the URL
  console.log("studentId", studentId);

  useEffect(() => {
    if (studentId) {
      dispatch({ type: "FETCH_ARCHIVED_STUDENT", payload: studentId });
      dispatch({ type: "FETCH_STUDENT", payload: studentId });
      dispatch({ type: "FETCH_YOUNGER_ASSESSMENT", payload: studentId.id });
      dispatch({ type: "FETCH_OLDER_ASSESSMENT", payload: studentId.id });
    }
  }, [dispatch, studentId]);

  const handleImageUpload = (url) => {
    // Dispatch action to update student record with new image URL
    dispatch({
      type: "UPLOAD_STUDENT_PICTURE",
      payload: { id: studentId, url: url },
    });
    dispatch({ type: "FETCH_STUDENT", payload: studentId });
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-1 flex justify-center">
            <div className=" flex-1 flex flex-col justify-center">
              <StudentCard />
            </div>
            {/* Button to open the upload dialog */}
            {/* <button onClick={handleOpenUploadDialog}>Upload Student Image</button> */}
          </div>
          {/* Image upload form */}
          <div className="absolute top-17 right-30  ">
            <CloudifyUploadForm onImageUpload={handleImageUpload} />
          </div>
          <div className="lg:flex-1 flex justify-center">
            <div className="flex-1 flex flex-col justify-center">
              <Tests />
            </div>
          </div>
        </div>

        <div className="mt-10">
          {/* Rest of the content like Tabs, Graphs, etc. */}

          <Tabs defaultValue="test" className="flex-1">
            <TabsList className="background-light800_dark400 min-h-[42px] p-1 rounded-t-lg">
              {["test", "graph", "assessment", "notes", "compare"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="tab h2-semibold hover:bg-primary-100 focus:bg-primary-100 px-6 py-3 rounded-lg transition duration-300 ease-in-out whiteTab"
                >
                  {tab.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="test">
              <TestTab />
            </TabsContent>
            <TabsContent value="graph" className="flex w-full flex-col gap-6 ">
              <GraphTab />
            </TabsContent>
            <TabsContent value="assessment" className="flex w-full flex-col gap-6">
              <AssessmentTab />
            </TabsContent>
            <TabsContent value="notes" className="flex w-full flex-col gap-6">
              <CommentsTab />
            </TabsContent>
            <TabsContent value="compare" className="flex w-full flex-col gap-6">
              <CompareTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* <div className="mt-10 flex gap-10"></div> */}
    </>
  );
}

export default StudentDetails;
