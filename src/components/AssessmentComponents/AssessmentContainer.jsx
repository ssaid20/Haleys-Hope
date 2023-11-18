import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import AssessmentGort from "./AssessmentGort";
import AssessmentCtoppE from "./AssessmentCtoppE";
import AssessmentCtoppS from "./AssessmentCtoppS";
import AssessmentWistE from "./AssessmentWistE";
import AssessmentWistS from "./AssessmentWistS";
// TODO: CHANGE ROUTE FOR GET TO DO EACH TEST SEPARATELY TO 
// MAKE SURE IF ONE DOES NOT EXIST, IT WILL STILL WORK

const AssessmentContainer = () => {
  return (
    <div>
      <AssessmentGort />
      <AssessmentWistE />
      <AssessmentWistS />
      <AssessmentCtoppE />
      <AssessmentCtoppS />

      {/* TODO: ADD NEW COMPONENTS FOR TESTS AND THEY WILL HAVE ACCESS TO ALL OF THE TEST INFO */}
    </div>
  );
};
export default AssessmentContainer;