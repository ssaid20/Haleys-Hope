import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const AssessmentCtoppS = () => {
  const studentId = useParams();

  return (
    <div>
      <p style={{ color: "brown" }}>Hello CtoppS</p>
    </div>
  );
};

export default AssessmentCtoppS;
