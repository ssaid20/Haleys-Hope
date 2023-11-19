import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";

const WistSTable = () => {
  return (
    <div>
      <p>Raw Score Intervals for Grade Levels</p>
      <table>
        <thead>
          <tr>
            {/* &lt; is for the < character */}
            <th>&lt;5</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt;75</td>
            <td>75-79</td>
            <td>80-84</td>
            <td>85-89</td>
            <td>90-91</td>
            <td>92</td>
            <td>93-94</td>
            <td>95-96</td>
            <td>&gt;96</td>
          </tr>
          <tr>
            <td>&lt;25</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
            <td>30</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>&lt;58</td>
            <td>58-59</td>
            <td>60-62</td>
            <td>63-67</td>
            <td>68-70</td>
            <td>71-73</td>
            <td>74-75</td>
            <td>76-79</td>
            <td>&gt;79</td>
          </tr>
          <tr>
            <td>&lt;21</td>
            <td>21-23</td>
            <td>24-25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
            <td>30</td>
            <td>-</td>
          </tr>
          <tr>
            <td>&lt;32</td>
            <td>32-33</td>
            <td>34-36</td>
            <td>37</td>
            <td>38-39</td>
            <td>40-41</td>
            <td>42-43</td>
            <td>44-45</td>
            <td>&gt;45</td>
          </tr>
          <tr>
            <td>&lt;72</td>
            <td>72-73</td>
            <td>74</td>
            <td>75</td>
            <td>76</td>
            <td>77</td>
            <td>78</td>
            <td>79</td>
            <td>&gt;79</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WistSTable;
