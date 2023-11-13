import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const Tests = () => {
  const history = useHistory();

  const studentId = useParams();

  const [selectedTests, setSelectedTests] = useState({
    CTOPP2: false,
    WIST: false,
    GORT5: false,
  });

  useEffect(() => {
    handleElementaryWistClick;
  }, []);

  const handleElementaryWistClick = () => {
    history.push(`/addElementaryWist/${studentId.id}`);
  };
  const handleSecondaryWistClick = () => {
    history.push(`/addSecondaryWist/${studentId.id}`);
  };
  const handleGortClick = () => {
    history.push(`/addGort/${studentId.id}`);
  };
  const handleElementaryCtoppClick = () => {
    history.push(`/addElementaryCtopp/${studentId.id}`);
  };
  const handleSecondaryCtoppClick = () => {
    history.push(`/addSecondaryCtopp/${studentId.id}`);
  };
  const handleKteaClick = () => {
    history.push(`/addKtea/${studentId.id}`);
  };

  const handleCheckboxChange = (event) => {
    setSelectedTests({
      ...selectedTests,
      [event.target.name]: event.target.checked,
    });
  };

  const handleStartClick = () => {
    console.log("Selected Tests: ", selectedTests);
    // Add logic for what happens when 'Start' is clicked
  };

  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Tests</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <button onClick={handleElementaryWistClick}>Elementary WIST</button>
            <button onClick={handleSecondaryWistClick}>Secondary WIST</button>
            <button onClick={handleGortClick}>Add GORT</button>
            <button onClick={handleElementaryCtoppClick}>Under 7 CTOPP</button>
            <button onClick={handleSecondaryCtoppClick}>Over 7 CTOPP</button>
            <button onClick={handleKteaClick}>KTEA</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
