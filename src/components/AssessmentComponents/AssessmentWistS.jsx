import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const AssessmentWistS = () => {
  const studentId = useParams();

  return (
    <div>
      <p style={{ color: "brown" }}>Hello WistS</p>
    </div>
  );
};

export default AssessmentWistS;
