import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" }); // Abbreviated month name
  const day = date.getDate().toString().padStart(2, "0"); // Two-digit day

  return `${year}/${month}/${day}`;
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
  const range = scoreRanges.find(
    (range) => score >= range.min && score <= range.max
  );
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
