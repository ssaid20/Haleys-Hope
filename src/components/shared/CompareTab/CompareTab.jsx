import React from "react";
import GortComparisonTable from "../../TestComparisons/GortComparison";
import SecondaryWistComparisonTable from "../../TestComparisons/SecondaryWistComparison";
import ElementaryWistComparisonTable from "../../TestComparisons/ElementaryWistComparison";

const CompareTab = () => {
  return (
    <div>
      <div className="h2-bold">GORT-5 TEST COMPARISON</div>
      <GortComparisonTable />

      <div className="h2-bold">WIST 11-18 TEST COMPARISON</div>
      <SecondaryWistComparisonTable />
     
      <div className="h2-bold">WIST 7-11 TEST COMPARISON</div>
      <ElementaryWistComparisonTable />
    </div>
  );
};

export default CompareTab;
