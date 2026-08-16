// Rounds to 2 decimal places and avoids floating point artifacts
// e.g. 2999.9700000000003 -> 2999.97
export const formatPrice = (value) => {
  return Number(Number(value).toFixed(2));
};
