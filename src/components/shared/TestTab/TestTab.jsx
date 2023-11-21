import React from "react";
import ElementaryWistList from "../../WistList/ElementaryWistList";
import SecondaryWistList from "../../WistList/SecondaryWistList";
import KteaList from "../../KteaList/KteaList";
import GortList from "../../GortList/GortList";
import YoungerCtoppList from "../../CtoppLists/YoungerCtoppList";
import OlderCtoppList from "../../CtoppLists/OlderCtoppList";
import GortComparisonTable from "../../TestComparisons/GortComparison";

const TestTab = () => {
  return (
    <div>
      <div>TestTab</div>
      <ElementaryWistList />
      <SecondaryWistList />
      <GortList />
      <KteaList />
      <YoungerCtoppList />
      <OlderCtoppList />
      <GortComparisonTable />
    </div>
  );
};

export default TestTab;
