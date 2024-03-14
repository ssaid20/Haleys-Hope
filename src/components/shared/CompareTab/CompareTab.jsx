import React from "react";
import GortComparisonTable from "../../TestComparisons/GortComparison";
import OldCtoppComparison from "../../TestComparisons/OldCtoppComparison";
import SecondaryWistComparisonTable from "../../TestComparisons/SecondaryWistComparison";
import ElementaryWistComparisonTable from "../../TestComparisons/ElementaryWistComparison";
import YoungCtoppComparison from "../../TestComparisons/YoungCtoppComparison";
import PrintButton from "../../PrintButton/PrintButton";

const CompareTab = () => {
  return (
    <div>
      <PrintButton />
      <div className="h2-bold" style={{marginTop: "100px"}} >GORT-5 TEST COMPARISON</div>
      <GortComparisonTable />
      <br />
      <div className="h2-bold" style={{marginTop: "100px"}}>CTOPP-2 AGES 7-24 TEST COMPARISON</div>
      <OldCtoppComparison />
     <br /> <hr />
     <div className="h2-bold" style={{marginTop: "100px"}}>CTOPP-2 AGES 4-6 TEST COMPARISON</div>
      <YoungCtoppComparison />
     <br /> <hr />
      <div className="h2-bold" style={{marginTop: "100px"}}>WIST AGES 11-18 TEST COMPARISON</div>
      <SecondaryWistComparisonTable />
     <br /> <hr />

      <div className="h2-bold" style={{marginTop: "100px"}}>WIST AGES 7-11 TEST COMPARISON</div>
      <ElementaryWistComparisonTable />
    </div>
    
  );
};

export default CompareTab;
