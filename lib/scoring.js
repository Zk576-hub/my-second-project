// Pure function, no side effects. Scores are user-entered judgment calls
// (0-100 per factor) — this file only does the weighted arithmetic. We do
// NOT auto-generate factor scores from raw data; that would be the same
// fabricated-precision problem as auto-generated weights, just moved one
// step downstream. Live data is shown as context for the human to score.

export function computeCompositeScore(factors, scoreMap) {
  let weightedSum = 0;
  let weightTotal = 0;
  let scoredWeight = 0;

  for (const factor of factors) {
    weightTotal += factor.weight;
    const score = scoreMap[factor.key];
    if (typeof score === "number" && !Number.isNaN(score)) {
      weightedSum += score * factor.weight;
      scoredWeight += factor.weight;
    }
  }

  if (scoredWeight === 0) {
    return { composite: null, coverage: 0 };
  }

  // Normalize by the weight actually scored so partial input doesn't
  // silently drag the score toward zero.
  const composite = weightedSum / scoredWeight;
  const coverage = Math.round((scoredWeight / weightTotal) * 100);

  return { composite: Math.round(composite), coverage };
}

export function scoreLabel(composite) {
  if (composite === null) return { text: "No data", tone: "neutral" };
  if (composite >= 65) return { text: "Bullish bias", tone: "bullish" };
  if (composite <= 35) return { text: "Bearish bias", tone: "bearish" };
  return { text: "Neutral / mixed", tone: "neutral" };
}
