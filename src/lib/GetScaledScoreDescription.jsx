export const getScaledScoreDescription = (scaledScore) => {
  if (scaledScore >= 1 && scaledScore <= 3) {
    return <p>"Very Poor"</p>;
  } else if (scaledScore >= 4 && scaledScore <= 5) {
    return "Poor";
  } else if (scaledScore >= 6 && scaledScore <= 7) {
    return "Below Average";
  } else if (scaledScore >= 8 && scaledScore <= 12) {
    return "Average";
  } else if (scaledScore >= 13 && scaledScore <= 14) {
    return "Above Average";
  } else if (scaledScore >= 15 && scaledScore <= 16) {
    return "Superior";
  } else if (scaledScore >= 17) {
    return "Very Superior";
  } else {
    return "Invalid Score";
  }
};
