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
        <TableHead>
           
        </TableHead>
        <TableHead align="center">
          <TableRow>
          <TableCell>
    Test
</TableCell>
<TableCell>
Date
</TableCell>
<TableCell>
Date
</TableCell>
<TableCell>
Date
</TableCell>
          </TableRow>
        
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Wist 7-11
            </TableCell>
            <TableCell>10-10-2010</TableCell>

            <TableCell>11-11-2011</TableCell>
            <TableCell>12-12-2012</TableCell>


            <TableCell>

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
Wist 11-18         </TableCell>
<TableCell>11-11-2011</TableCell>
<TableCell>11-11-2011</TableCell>
<TableCell>11-11-2011</TableCell>

          </TableRow>         <TableRow>
            <TableCell>
Ctopp 4-6        </TableCell>
<TableCell>11-11-2011</TableCell>
<TableCell>11-11-2011</TableCell>
<TableCell>11-11-2011</TableCell>

          </TableRow>
          <TableRow>
            <TableCell>
Ctopp 7-24         </TableCell>
<TableCell>11-11-2011</TableCell>
<TableCell>11-11-2011</TableCell>
<TableCell>11-11-2011</TableCell>

          </TableRow>

        </TableBody>
      </Table>

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
