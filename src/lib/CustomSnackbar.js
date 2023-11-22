import React from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = () => {
  // const { open, message, severity } = useSelector((state) => state.snackbar);
  const { open, message, severity } = useSelector((state) => state.snackbar ?? {});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // Dispatch action to close the snackbar
    dispatch({ type: "HIDE_SNACKBAR" });
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        maxWidth: "80%",
        "& .MuiSnackbarContent-root": {
          fontSize: "1rem",
          padding: "8px 24px",
          boxShadow:
            "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          fontSize: "1.3rem",
          padding: "8px 24px",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
