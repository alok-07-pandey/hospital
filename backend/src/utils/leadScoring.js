function calculateLeadScore(message, createdAt, urgencyLevel, previousInteractions) {
  let score = 10; // Base Score
  message = message.toLowerCase();

  // Priority Keywords
  const keywordScores = {
    "surgery": 30,
    "emergency": 40,
    "health checkup": 20,
    "insurance": 30,
    "corporate": 15,
    "specialist": 25,
    "doctor": 20,
  };

  // Check for keywords in the message
  Object.keys(keywordScores).forEach((keyword) => {
    if (message.includes(keyword)) {
      score += keywordScores[keyword];
    }
  });

  // Urgency Level (Higher urgency = Higher score)
  if (urgencyLevel === "high") {
    score += 20;
  } else if (urgencyLevel === "medium") {
    score += 10;
  }

  // Previous Interactions (More interactions = Higher score)
  if (previousInteractions > 3) {
    score += 15;
  } else if (previousInteractions > 1) {
    score += 5;
  }

  // Reduce score if no response in 7+ days
  const leadAgeInDays = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
  if (leadAgeInDays > 7) {
    score -= 10;
  }
  if (leadAgeInDays > 14) {
    score -= 20;
  }

  return Math.max(score, 0); // Ensure score is not negative
}

module.exports = { calculateLeadScore };
