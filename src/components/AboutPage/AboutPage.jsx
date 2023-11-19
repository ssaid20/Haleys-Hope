import React from "react";
import WistETable from "../WistTables/WistETable";
import WistSTable from "../WistTables/WistSTable";

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p className="text-3xl font-bold underline">This about page is for anyone to read!</p>
        <WistETable />
        <WistSTable />
      </div>
    </div>
  );
}

export default AboutPage;
