function calculateLeadScore(message, createdAt) {
    let score = 10; // Base Score
  
    if (message.toLowerCase().includes("surgery") || message.toLowerCase().includes("health checkup")) {
      score += 20;
    }
  
    if (message.toLowerCase().includes("insurance")) {
      score += 30;
    }
  
    if (message.toLowerCase().includes("corporate")) {
      score += 10;
    }
  
    // Reduce score if no response in 7+ days
    const leadAgeInDays = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
    if (leadAgeInDays > 7) {
      score -= 10;
    }
  
    return score;
  }
  
  module.exports = { calculateLeadScore };
  