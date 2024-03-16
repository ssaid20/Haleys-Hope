import React from "react";
import { Button } from "@mui/material";

function PrintButton2() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <Button
      className="noPrint"
      variant="contained"
      color="primary"
      onClick={handlePrint}
      style={{ marginRight: "20px" }}
    >
      Print{" "}
    </Button>
  );
}
export default PrintButton2;
