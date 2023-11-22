import React from "react";
import GortComparisonTable from "../../TestComparisons/GortComparison";
import OldCtoppComparison from "../../TestComparisons/OldCtoppComparison";

const CompareTab = () => {
  return (
    <div>
      <div className="h2-bold">GORT-5 TESTS COMPARISON</div>

      <GortComparisonTable />
      <br />
      <div className="h2-bold">CTOPP-2 OVER 7 TESTS COMPARISON</div>
      <OldCtoppComparison />
    </div>
  );
};

export default CompareTab;
