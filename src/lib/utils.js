import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//function to format tate as (yyyy/mon/dd: 2023/Nov/13)
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" }); // Abbreviated month name
  const day = date.getDate().toString().padStart(2, "0"); // Two-digit day

  return `${year}/${month}/${day}`;
};
// formats date as mm/dd/yyyy
export const formatDate2 = (dateString) => {
  const date = new Date(dateString);
  let month = "" + (date.getMonth() + 1), // Months are zero indexed
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
};
// Function to format date as YYYY-MM-DD
export const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  let month = "" + (date.getMonth() + 1), // Months are zero indexed
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-"); // Format as YYYY-MM-DD
};
// Define the score ranges and descriptive terms
const scoreRanges = [
  { min: 1, max: 3, term: "Very Poor" },
  { min: 4, max: 5, term: "Poor" },
  { min: 6, max: 7, term: "Below Average" },
  { min: 8, max: 12, term: "Average" },
  { min: 13, max: 14, term: "Above Average" },
  { min: 15, max: 16, term: "Superior" },
  { min: 17, max: 20, term: "Very Superior" },
];

// Function to get the descriptive term based on the scaled score
export const getDescriptiveTerm = (score) => {
  const range = scoreRanges.find((range) => score >= range.min && score <= range.max);
  return range ? range.term : "Unknown";
};

// Example usage in a React component
// const ScoreInterpreter = () => {
//     const [score, setScore] = React.useState('');
//     const [term, setTerm] = React.useState('');

//     const handleChange = (e) => {
//         const newScore = parseInt(e.target.value, 10);
//         setScore(newScore);
//         setTerm(getDescriptiveTerm(newScore));
//     };

//     return (
//         <div>
//             <input type="number" value={score} onChange={handleChange} />
//             <p>Descriptive Term: {term}</p>
//         </div>
//     );
// };

//export default ScoreInterpreter;

// function to calculate age using dob and display as example: 2023 Y 04 M 10 D
export const calculateAge = (dob) => {
  const birthday = new Date(dob);
  const today = new Date();

  // Calculate the difference in years
  let years = today.getFullYear() - birthday.getFullYear();

  // Calculate the difference in months
  let months = today.getMonth() - birthday.getMonth();

  // Calculate the difference in days
  let days = today.getDate() - birthday.getDate();

  // Adjust the years and months if necessary
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // Adjust the days if necessary
  if (days < 0) {
    months--;
    // Create a date object for the last day of the previous month
    let lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastDayOfPrevMonth.getDate();
  }

  // Return the age in the desired format
  return `${years}Y ${months < 10 ? "0" : ""}${months}M ${days < 10 ? "0" : ""}${days}D`;
}; // end calculateAge

export function formatDate3(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
