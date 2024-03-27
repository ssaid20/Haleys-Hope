import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";

const IncrementGrade = () => {
  const dispatch = useDispatch();
  const cronJobs = useSelector((state) => state.cronJobReducer?.list ?? []);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedDates, setEditedDates] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const [date, setDate] = useState(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isPastAugust = currentDate > new Date(`${currentYear}-08-01`);
    return isPastAugust ? `${currentYear + 1}-08-01` : `${currentYear}-08-01`;
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch({ type: "FETCH_CRON_JOBS" });
    setIsLoading(false);
  }, [dispatch]);

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const handleEdit = (jobId) => {
    setEditingJobId(jobId);
    setEditedDates((prevDates) => ({
      ...prevDates,
      [jobId]: cronJobs.find((job) => job.id === jobId).scheduled_date,
    }));
  };
  const handleDateChange = (event, jobId) => {
    setEditedDates((prevDates) => ({
      ...prevDates,
      [jobId]: event.target.value,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const handleChangeSubmit = async (jobId) => {
    const updatedDate = editedDates[jobId];
    dispatch({ type: "UPDATE_CRON_JOB", payload: { jobId, updatedDate } });
    console.log("update cron payload", jobId, updatedDate);
    setEditingJobId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!date) {
      newErrors.date = "Date is required";
    } else if (new Date(date) < new Date()) {
      newErrors.date = "Date cannot be in the past";
    }

    setValidationErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch({
        type: "ADD_CRON_JOB",
        payload: { date },
      });
    }
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const isPastAugust = currentDate > new Date(`${currentYear}-08-01`);
  const defaultDate = isPastAugust
    ? `${currentYear + 1}-08-01`
    : `${currentYear}-08-01`;

  if (isLoading) {
    return <div>Loading cron jobs...</div>;
  }
  return (
    <Paper elevation={3} className="p-8">
      <h1>Set Date for Annual Grade Increase</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Set Date:</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                name="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={handleChange}
                error={!!validationErrors.date}
                helperText={validationErrors.date}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <br />
      <br />
      <h2>Dates</h2>
      <List>
        {cronJobs.map((job) => (
          <ListItem
            key={job.id}
            style={{ opacity: job.is_completed ? 0.5 : 1 }}
          >
            {editingJobId === job.id ? (
              <>
                <TextField
                  type="date"
                  variant="outlined"
                  value={editedDates[job.id]}
                  onChange={(e) => handleDateChange(e, job.id)}
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleChangeSubmit(job.id)}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`Date: ${formatDate(job.scheduled_date)}`}
                  secondary={job.is_completed ? "Completed" : "Pending"}
                />
                {!job.is_completed && (
                  <Button variant="outlined" onClick={() => handleEdit(job.id)}>
                    Edit
                  </Button>
                )}
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default IncrementGrade;
