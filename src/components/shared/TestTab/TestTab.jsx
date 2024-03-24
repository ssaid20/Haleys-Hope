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
import { Bold } from "lucide-react";
const TestTab = () => {
  return (
    <div>
      <Table>
        <TableHead></TableHead>
        <TableHead align="center" >
          <TableRow>
            <TableCell style={{ width: 250, fontWeight: "bold", fontSize: 18 }}>Test</TableCell>
            <TableCell style={{ width: 250, fontWeight: "bold", fontSize: 18 }}>Date</TableCell>
            {/* <TableCell style={{ width: 250 }}>Date</TableCell>
            <TableCell style={{ width: 250 }}>Date</TableCell> */}
          </TableRow>
        </TableHead>
      </Table>

      <Table>
        <ElementaryWistList />
        <SecondaryWistList />
        <YoungerCtoppList />
        <OlderCtoppList />
        <GortList />
        <KteaList />
        {/* <GortComparisonTable />
      <SecondaryWistComparisonTable />
      <ElementaryWistComparisonTable /> */}
      </Table>
    </div>
  );
};

export default TestTab;
