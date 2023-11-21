import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import { Typography } from "@mui/material";

const WistSTable = () => {
  const tableStyle = {
    border: "1px solid black",
    borderCollapse: "collapse", // Collapse borders to avoid double borders
  };
  const cellStyle = {
    border: "1px solid black",
    padding: "10px",
    textAlign: "center",  };
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Raw Score Intervals for Grade Levels
      </Typography>
      <table style={tableStyle}>
        <thead>
          <tr>
            {/* &lt; is for the < character */}
            <th style={cellStyle}>&lt;5</th>
            <th style={cellStyle}>5</th>
            <th style={cellStyle}>6</th>
            <th style={cellStyle}>7</th>
            <th style={cellStyle}>8</th>
            <th style={cellStyle}>9</th>
            <th style={cellStyle}>10</th>
            <th style={cellStyle}>11</th>
            <th style={cellStyle}>12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>&lt;75</td>
            <td style={cellStyle}>75-79</td>
            <td style={cellStyle}>80-84</td>
            <td style={cellStyle}>85-89</td>
            <td style={cellStyle}>90-91</td>
            <td style={cellStyle}>92</td>
            <td style={cellStyle}>93-94</td>
            <td style={cellStyle}>95-96</td>
            <td style={cellStyle}>&gt;96</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;25</td>
            <td style={cellStyle}>25</td>
            <td style={cellStyle}>26</td>
            <td style={cellStyle}>27</td>
            <td style={cellStyle}>28</td>
            <td style={cellStyle}>29</td>
            <td style={cellStyle}>30</td>
            <td style={cellStyle}>-</td>
            <td style={cellStyle}>-</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;58</td>
            <td style={cellStyle}>58-59</td>
            <td style={cellStyle}>60-62</td>
            <td style={cellStyle}>63-67</td>
            <td style={cellStyle}>68-70</td>
            <td style={cellStyle}>71-73</td>
            <td style={cellStyle}>74-75</td>
            <td style={cellStyle}>76-79</td>
            <td style={cellStyle}>&gt;79</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;21</td>
            <td style={cellStyle}>21-23</td>
            <td style={cellStyle}>24-25</td>
            <td style={cellStyle}>26</td>
            <td style={cellStyle}>27</td>
            <td style={cellStyle}>28</td>
            <td style={cellStyle}>29</td>
            <td style={cellStyle}>30</td>
            <td style={cellStyle}>-</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;32</td>
            <td style={cellStyle}>32-33</td>
            <td style={cellStyle}>34-36</td>
            <td style={cellStyle}>37</td>
            <td style={cellStyle}>38-39</td>
            <td style={cellStyle}>40-41</td>
            <td style={cellStyle}>42-43</td>
            <td style={cellStyle}> 44-45</td>
            <td style={cellStyle}>&gt;45</td>
          </tr>
          <tr>
            <td style={cellStyle}>&lt;72</td>
            <td style={cellStyle}>72-73</td>
            <td style={cellStyle}>74</td>
            <td style={cellStyle}>75</td>
            <td style={cellStyle}>76</td>
            <td style={cellStyle}>77</td>
            <td style={cellStyle}>78</td>
            <td style={cellStyle}>79</td>
            <td style={cellStyle}>&gt;79</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WistSTable;
