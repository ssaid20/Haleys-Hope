import React from "react";
import ElementaryWistList from "../../WistList/ElementaryWistList";
import SecondaryWistList from "../../WistList/SecondaryWistList";
import KteaList from "../../KteaList/KteaList";
import GortList from "../../GortList/GortList";
import YoungerCtoppList from "../../CtoppLists/YoungerCtoppList";
import OlderCtoppList from "../../CtoppLists/OlderCtoppList";
import GortComparisonTable from "../../TestComparisons/GortComparison";
import { Button } from "../../ui/button";
import SecondaryWistComparisonTable from "../../TestComparisons/SecondaryWistComparison";
import ElementaryWistComparisonTable from "../../TestComparisons/ElementaryWistComparison";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
const TestTab = () => {
  return (
    <div>
      <Table>
      <ElementaryWistList />
      <SecondaryWistList />
      <GortList />
      <KteaList />
      <YoungerCtoppList />
      <OlderCtoppList />
      {/* <GortComparisonTable />
      <SecondaryWistComparisonTable />
      <ElementaryWistComparisonTable /> */}
      </Table>
    </div>
  );
};

export default TestTab;
