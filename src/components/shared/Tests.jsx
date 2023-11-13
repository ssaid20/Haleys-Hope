import React, { useState } from 'react';

const Tests = () => {
  const [selectedTests, setSelectedTests] = useState({
    CTOPP2: false,
    WIST: false,
    GORT5: false,
  });

  const handleCheckboxChange = (event) => {
    setSelectedTests({ ...selectedTests, [event.target.name]: event.target.checked });
  };

  const handleStartClick = () => {
    console.log('Selected Tests: ', selectedTests);
    // Add logic for what happens when 'Start' is clicked
  };

  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Tests</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="CTOPP2"
              checked={selectedTests.CTOPP2}
              onChange={handleCheckboxChange}
            />
            CTOPP-2
          </label>
          <label>
            <input
              type="checkbox"
              name="WIST"
              checked={selectedTests.WIST}
              onChange={handleCheckboxChange}
            />
            WIST
          </label>
          <label>
            <input
              type="checkbox"
              name="GORT5"
              checked={selectedTests.GORT5}
              onChange={handleCheckboxChange}
            />
            GORT-5
          </label>
          </div>
        </div>
        <button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3" onClick={handleStartClick}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Tests;
