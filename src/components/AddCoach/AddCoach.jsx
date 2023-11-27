import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";

const AddCoach = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [coachData, setCoachData] = useState({
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setCoachData({ ...coachData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_COACH", payload: coachData });
    // Reset form
    setCoachData({
      first_name: "",
      last_name: "",
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Coach Added", severity: "success" } });

    history.push("/admin/coaches");
  };

  const goBack = () => {
    history.push("/admin/coaches");
  };

  return (
    <Paper style={{ padding: "20px", marginTop: "20px" }}>
      <Button variant="outlined" onClick={goBack} style={{ marginBottom: "10px" }}>
        Go Back
      </Button>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="first_name"
              value={coachData.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="last_name"
              value={coachData.last_name}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
          Add Coach
        </Button>
      </form>
    </Paper>
  );
};
export default AddCoach;
