export const GetScaledScoreDescription = ({ scaledScore }) => {
  const getStyleForScore = (score) => {
    if (score >= 1 && score <= 3) {
      return { color: "black", backgroundColor: "#ffcccc" }; // Very Poor
    } else if (score >= 4 && score <= 5) {
      return { color: "black", backgroundColor: "#ffebcc" }; // Poor
    } else if (score >= 6 && score <= 7) {
      return { color: "black", backgroundColor: "#ffffcc" }; // Below Average
    } else if (score >= 8 && score <= 12) {
      return { color: "black", backgroundColor: "#cce5ff" }; // Average
    } else if (score >= 13 && score <= 14) {
      return { color: "black", backgroundColor: "#ccffcc" }; // Above Average
    } else if (score >= 15 && score <= 16) {
      return { color: "black", backgroundColor: "#99cc99" }; // Superior
    } else if (score >= 17) {
      return { color: "black", backgroundColor: "#669966" }; // Very Superior
    } else {
      return {};
    }
  };

  let description = "Invalid Score";
  let style = getStyleForScore(scaledScore);

  if (scaledScore >= 1 && scaledScore <= 3) {
    description = "Very Poor";
  } else if (scaledScore >= 4 && scaledScore <= 5) {
    description = "Poor";
  } else if (scaledScore >= 6 && scaledScore <= 7) {
    description = "Below Average";
  } else if (scaledScore >= 8 && scaledScore <= 12) {
    description = "Average";
  } else if (scaledScore >= 13 && scaledScore <= 14) {
    description = "Above Average";
  } else if (scaledScore >= 15 && scaledScore <= 16) {
    description = "Superior";
  } else if (scaledScore >= 17) {
    description = "Very Superior";
  }

  return <p style={style}>{description}</p>;
};
