import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";

const WistETable = () => {
  return (
    <div>
      <p>Raw Score Intervals for Grade Levels</p>
      <table>
        <thead>
          <tr>
            {/* &lt; is for the < character &gt; is for > character */}
            <th>&lt;2</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>&gt;6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt;64</td>
            <td>64-73</td>
            <td>74-82</td>
            <td>83-91</td>
            <td>92-97</td>
            <td>98-99</td>
            <td>&gt;99</td>
          </tr>
          <tr>
            <td>&lt;22</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>&gt;26</td>
          </tr>
          <tr>
            <td>&lt;30</td>
            <td>30-43</td>
            <td>44-56</td>
            <td>57-68</td>
            <td>69-79</td>
            <td>80-83</td>
            <td>&gt;83</td>
          </tr>
          <tr>
            <td>&lt;12</td>
            <td>12-14</td>
            <td>15-17</td>
            <td>18-20</td>
            <td>21-23</td>
            <td>24-25</td>
            <td>&gt;25</td>
          </tr>
          <tr>
            <td>&lt;25</td>
            <td>25-26</td>
            <td>27-29</td>
            <td>30-31</td>
            <td>32-33</td>
            <td>34-36</td>
            <td>&gt;36</td>
          </tr>
          <tr>
            <td>&lt;68</td>
            <td>68-69</td>
            <td>70</td>
            <td>71</td>
            <td>72-73</td>
            <td>74</td>
            <td>&gt;74</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WistETable;
