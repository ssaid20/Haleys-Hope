import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import Tests from "../shared/Tests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TestTab from "../shared/TestTab/TestTab";
import AssesmentTab from "../shared/AssesmentTab/AssesmentTab";
import GraphTab from "../shared/GraphTab/GraphTab";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function StudentDetails() {
  const dispatch = useDispatch();
  const student = useSelector((store) => store.studentReducer);
  console.log("student", student);
  const { id } = useParams(); // Retrieve the student ID from the URL

  useEffect(() => {
    if (id) {
      dispatch({ type: "FETCH_STUDENT", payload: id });
    }
  }, [dispatch, id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <img
            src={student.picture} //change it to student store
            alt="Student picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{student.firstname}{student.lastname}</h2>
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Link to="/student/edit">
            <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
              Edit Student
            </Button>
          </Link>
        </div>
      </div>

      <Tests />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="test" className="tab">
              TEST
            </TabsTrigger>
            <TabsTrigger value="graph" className="tab">
              GRAPH
            </TabsTrigger>
            <TabsTrigger value="assesment" className="tab">
              ASSESMENT
            </TabsTrigger>
          </TabsList>
          <TabsContent value="test">
            <TestTab />
          </TabsContent>
          <TabsContent value="graph" className="flex w-full flex-col gap-6">
            <GraphTab />
          </TabsContent>
          <TabsContent value="assesment" className="flex w-full flex-col gap-6">
            <AssesmentTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default StudentDetails;
