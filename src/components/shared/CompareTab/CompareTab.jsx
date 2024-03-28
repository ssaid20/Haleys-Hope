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
      <div className="h2-bold" style={{marginTop: "20px", textAlign: "center" }} >GORT-5 TEST COMPARISON</div>
      <GortComparisonTable />
      <br />
     <div className="h2-bold" style={{marginTop: "60px", textAlign: "center"}}>CTOPP-2 AGES 4-6 TEST COMPARISON</div>
      <YoungCtoppComparison />
      <div className="h2-bold" style={{marginTop: "60px" , textAlign: "center"}}>CTOPP-2 AGES 7-24 TEST COMPARISON</div>
      <OldCtoppComparison />
     
      <hr />
      <div className="h2-bold" style={{marginTop: "70px", textAlign: "center"}}>WIST AGES 7-11 TEST COMPARISON</div>
      <ElementaryWistComparisonTable />
     <br /> <hr />
      <div className="h2-bold" style={{marginTop: "70px", textAlign: "center"}}>WIST AGES 11-18 TEST COMPARISON</div>
      <SecondaryWistComparisonTable />

    </div>
    
  );
};

export default CompareTab;
