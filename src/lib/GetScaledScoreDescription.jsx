export const getScaledScoreDescription = (scaledScore) => {
  if (scaledScore >= 1 && scaledScore <= 3) {
    return <p>Very Poor</p>;
  } else if (scaledScore >= 4 && scaledScore <= 5) {
    return <p>Poor</p>;
  } else if (scaledScore >= 6 && scaledScore <= 7) {
    return <p>Below Average</p>;
  } else if (scaledScore >= 8 && scaledScore <= 12) {
    return <p>Average</p>;
  } else if (scaledScore >= 13 && scaledScore <= 14) {
    return <p>Above Average</p>;
  } else if (scaledScore >= 15 && scaledScore <= 16) {
    return <p>Superior</p>;
  } else if (scaledScore >= 17) {
    return <p>Very Superior</p>;
  } else {
    return <p>Invalid Score</p>;
  }
};
