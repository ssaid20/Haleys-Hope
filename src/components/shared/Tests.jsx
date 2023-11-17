import React from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const Tests = () => {
  const history = useHistory();
  const studentId = useParams();

  const handleButtonClick = (path) => {
    history.push(`/${path}/${studentId.id}`);
  };

  const testButtons = [
    { text: "Elementary WIST", path: "addElementaryWist" },
    { text: "Secondary WIST", path: "addSecondaryWist" },
    { text: "GORT-5", path: "addGort" },
    { text: "CTOPP-2 Under 7", path: "addElementaryCtopp" },
    { text: "CTOPP-2 Over 7", path: "addSecondaryCtopp" },
    { text: "KTEA", path: "addKtea" },
  ];

  return (
    <div className="background-light900_dark200 light-border rounded-2xl border p-8 shadow-md relative flex flex-col items-center">
      <h4 className="h3-semibold text-dark200_light900">ADMINISTER TEST</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-10">
        {testButtons.map(({ text, path }, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(path)}
            className="col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
          >
            <img
              src="/assets/icons/exam.svg"
              alt="Exam Icon"
              className="w-4 h-4"
            />
            <span>{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tests;
