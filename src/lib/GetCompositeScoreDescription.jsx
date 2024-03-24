// export const GetCompositeScoreDescription = ({ compositeScore, descriptor }) => {
//   if (descriptor === "<") {
//     return <p>Very Poor</p>;
//   } else if (descriptor === ">") {
//     return <p>Very Superior</p>;
//   }
//   if (compositeScore < 70) {
//     return <p>Very Poor</p>;
//   } else if (compositeScore >= 70 && compositeScore <= 79) {
//     return <p>Poor</p>;
//   } else if (compositeScore >= 80 && compositeScore <= 89) {
//     return <p>Below Average</p>;
//   } else if (compositeScore >= 90 && compositeScore <= 110) {
//     return <p>Average</p>;
//   } else if (compositeScore >= 111 && compositeScore <= 120) {
//     return <p>Above Average</p>;
//   } else if (compositeScore >= 121 && compositeScore <= 130) {
//     return <p>Superior</p>;
//   } else if (compositeScore >= 131) {
//     return <p>Very Superior</p>;
//   } else {
//     return <p>Invalid Score</p>;
//   }
// };
export const GetCompositeScoreDescription = ({ compositeScore, descriptor }) => {
  const getStyleAndText = () => {
    if (descriptor === "<" || compositeScore < 70) {
      return { style: { backgroundColor: "#ffcccc" }, text: "Very Poor" };
    } else if (descriptor === ">" || compositeScore >= 131) {
      return { style: { backgroundColor: "#669966" }, text: "Very Superior" };
    }
    // Add more conditions for other score ranges
    else if (compositeScore >= 70 && compositeScore <= 79) {
      return { style: { backgroundColor: "#ffebcc" }, text: "Poor" };
    } else if (compositeScore >= 80 && compositeScore <= 89) {
      return { style: { backgroundColor: "#ffffcc" }, text: "Below Average" };
    } else if (compositeScore >= 90 && compositeScore <= 110) {
      return { style: { backgroundColor: "#cce5ff" }, text: "Average" };
    } else if (compositeScore >= 111 && compositeScore <= 120) {
      return { style: { backgroundColor: "#ccffcc" }, text: "Above Average" };
    } else if (compositeScore >= 121 && compositeScore <= 130) {
      return { style: { backgroundColor: "#99cc99" }, text: "Superior" };
    } else {
      return { style: { backgroundColor: "lightGrey" }, text: "Invalid Score" };
    }
  };

  const { style, text } = getStyleAndText();

  return <p style={style}>{text}</p>;
};
