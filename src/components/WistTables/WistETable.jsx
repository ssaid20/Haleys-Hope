import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

const tableStyle = {
  border: "1px solid black",
  borderCollapse: "collapse", // Collapse borders to avoid double borders
};
const cellStyle = {
  border: "1px solid black",
  padding: "20px",
  textAlign: "center",
};
const WistETable = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Raw Score Intervals for Grade Levels
      </Typography>
      <table style={tableStyle}>
        <thead>
          <tr>
            {/* &lt; is for the < character &gt; is for > character */}
            <th style={cellStyle}>&lt;2</th>
            <th style={cellStyle}>2</th>
            <th style={cellStyle}>3</th>
            <th style={cellStyle}>4</th>
            <th style={cellStyle}>5</th>
            <th style={cellStyle}>6</th>
            <th style={cellStyle}>&gt;6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>&lt;64</td>
            <td style={cellStyle}>64-73</td>
            <td style={cellStyle}>74-82</td>
            <td style={cellStyle}>83-91</td>
            <td style={cellStyle}>92-97</td>
            <td style={cellStyle}>98-99</td>
            <td style={cellStyle}>&gt;99</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;22</td>
            <td style={cellStyle}>22</td>
            <td style={cellStyle}>23</td>
            <td style={cellStyle}>24</td>
            <td style={cellStyle}>25</td>
            <td style={cellStyle}>26</td>
            <td style={cellStyle}>&gt;26</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;30</td>
            <td style={cellStyle}>30-43</td>
            <td style={cellStyle}>44-56</td>
            <td style={cellStyle}>57-68</td>
            <td style={cellStyle}>69-79</td>
            <td style={cellStyle}>80-83</td>
            <td style={cellStyle}>&gt;83</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;12</td>
            <td style={cellStyle}>12-14</td>
            <td style={cellStyle}>15-17</td>
            <td style={cellStyle}>18-20</td>
            <td style={cellStyle}>21-23</td>
            <td style={cellStyle}>24-25</td>
            <td style={cellStyle}>&gt;25</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;25</td>
            <td style={cellStyle}>25-26</td>
            <td style={cellStyle}>27-29</td>
            <td style={cellStyle}> 30-31</td>
            <td style={cellStyle}>32-33</td>
            <td style={cellStyle}>34-36</td>
            <td style={cellStyle}>&gt;36</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;68</td>
            <td style={cellStyle}>68-69</td>
            <td style={cellStyle}>70</td>
            <td style={cellStyle}>71</td>
            <td style={cellStyle}>72-73</td>
            <td style={cellStyle}>74</td>
            <td style={cellStyle}>&gt;74</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WistETable;
