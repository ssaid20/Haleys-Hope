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
import NotesTab from "../shared/NotesTab/NotesTab";

function StudentDetails() {
  const dispatch = useDispatch();
  const student = useSelector((store) => store.studentReducer.Details);
  console.log("student", student);
  const studentId = useParams(); // Retrieve the student ID from the URL
  console.log("studentId", studentId);

  useEffect(() => {
    if (studentId) {
      dispatch({ type: "FETCH_STUDENT", payload: studentId });
      dispatch({ type: "FETCH_YOUNGER_ASSESSMENT", payload: studentId.id });
      dispatch({ type: "FETCH_OLDER_ASSESSMENT", payload: studentId.id });
    }
  }, [dispatch, studentId]);

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
              {["test", "graph", "assessment", "notes"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="tab h2-semibold hover:bg-primary-100 focus:bg-primary-100 px-4 py-2 rounded-lg transition duration-300 ease-in-out"
                >
                  {tab.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="test">
              <TestTab />
            </TabsContent>
            <TabsContent value="graph" className="flex w-full flex-col gap-6">
              <GraphTab />
            </TabsContent>
            <TabsContent
              value="assessment"
              className="flex w-full flex-col gap-6"
            >
              <AssessmentTab />
              <TabsContent value="notes" className="flex w-full flex-col gap-6">
                <NotesTab />
              </TabsContent>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* <div className="mt-10 flex gap-10"></div> */}
    </>
  );
}

export default StudentDetails;
