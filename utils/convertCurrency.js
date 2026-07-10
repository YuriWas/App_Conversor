export function convertCurrency(amount, rate) {
  const formattedAmount = amount.replace(",", ".");
  return (parseFloat(formattedAmount) * rate).toFixed(2);
}
