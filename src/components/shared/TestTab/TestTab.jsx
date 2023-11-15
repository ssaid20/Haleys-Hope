import React from "react";
import ElementaryWistList from "../../WistList/ElementaryWistList";
import SecondaryWistList from "../../WistList/SecondaryWistList";
import KteaList from "../../KteaList/KteaList";
import YoungerCtoppList from "../../CtoppLists/YoungerCtoppList";

const TestTab = () => {
  return (
    <div>
      <div>TestTab</div>
      <ElementaryWistList />
      <SecondaryWistList />
      <KteaList />
      <YoungerCtoppList />
    </div>
  );
};

export default TestTab;
