export const GetCompositeScoreDescription = ({ compositeScore }) => {
  if (compositeScore < 70) {
    return <p>"Very Poor"</p>;
  } else if (compositeScore >= 70 && compositeScore <= 79) {
    return <p>"Poor"</p>;
  } else if (compositeScore >= 80 && compositeScore <= 89) {
    return <p>"Below Average"</p>;
  } else if (compositeScore >= 90 && compositeScore <= 110) {
    return <p>"Average"</p>;
  } else if (compositeScore >= 111 && compositeScore <= 120) {
    return <p>"Above Average"</p>;
  } else if (compositeScore >= 121 && compositeScore <= 130) {
    return <p>"Superior"</p>;
  } else if (compositeScore >= 131) {
    return <p>"Very Superior"</p>;
  } else {
    return <p>"Invalid Score"</p>;
  }
};
