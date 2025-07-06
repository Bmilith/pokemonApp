type ComparisonResult = {
  percentA: number;
  percentB: number;
  betterA: boolean;
  betterB: boolean;
};

export function getStatComparison(
  valueA: number,
  valueB: number,
  maxValue: number
): ComparisonResult {
  const percentA = (valueA / maxValue) * 100;
  const percentB = (valueB / maxValue) * 100;

  return {
    percentA,
    percentB,
    betterA: valueA > valueB,
    betterB: valueB > valueA,
  };
}
