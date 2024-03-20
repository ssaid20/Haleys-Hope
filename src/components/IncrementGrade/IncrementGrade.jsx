import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const IncrementGrade = () => {
    const handleChange = (event) => {
        setNewDate(event.target.value);
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isPastAugust = currentDate > new Date(`${currentYear}-08-01`);
    const defaultDate = isPastAugust ? `${currentYear + 1}-08-01` : `${currentYear}-08-01`;

    // State for managing the selected date with default value
    const [date, setNewDate] = useState(defaultDate);

    return (
        <>
            <h1>Set Date for Annual Grade Increase</h1>
            <br />
            <TextField
                label="Set Date"
                variant="outlined"
                fullWidth
                name="cronJob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={handleChange}
            />
            <br />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>Submit </Button>
            <br />
            <br />
            <br />
        </>
    );
};

export default IncrementGrade;
